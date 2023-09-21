import { groupBy, isNil, memoize } from './lodash';

import type {
    GroupConstantValues,
    GroupedData,
    GroupFooter,
    GroupHeader,
    GroupMetaRow,
    GroupRecord,
    NormalizeAggregatesFunc,
    RecordWithId,
} from './grouping.types';
import { RowType } from './grouping.types';

export const isGroupFooter = (x: GroupedData): x is GroupFooter => x.rowType === RowType.FOOTER;
export const isGroupHeader = (x: GroupedData): x is GroupHeader => x.rowType === RowType.HEADER;
export const isDataRow = (x: GroupedData): x is GroupHeader => x.rowType === RowType.DATA;

const defaultConstants: GroupConstantValues[] = [];

/**
 *
 * Normalize a value of any type into string.
 *
 *
 */
const toStringValue = (value: unknown) => {
    if (isNil(value)) return `$$${value}`;
    if (!value) return `##${value}`;
    if (typeof value === 'boolean') return `!!${value}`;
    if (!(value instanceof Object)) return `%%${value}`;
    if (Array.isArray(value)) return value.map(({ id }) => id).join('&');
    return '@@unknown';
};

/**
 *
 * get a normalized key from value
 * Supports all kinds of primitives and Arrays of objects
 *
 */
const generateKeyFromValue = (key: string, value: unknown) => {
    return `k:${key}:v${toStringValue(value)}`;
};

/**
 *
 * generate a group ID from the passed constant values.
 *
 */
const generateGroupId = (constants: GroupConstantValues[]) =>
    constants.map(({ field, value }) => generateKeyFromValue(field, value)).join(';');

const getMemoizedConstants = memoize(constants => constants, generateGroupId);

/**
 *
 * Takes a record and the array of strings as groups,
 * generates group constants for the record
 *
 */
const generateConstantsForRecord = <T extends RecordWithId = RecordWithId>(
    modelRecord: T,
    groups: string[],
) => groups.map(key => createConstant(key, modelRecord[key]));

/**
 *
 * Takes a record, and the group by fields.
 * Returns a string of
 *
 */
const generateValueKey = <T extends RecordWithId = RecordWithId>(
    modelRecord: T,
    groups: string[],
) => generateGroupId(generateConstantsForRecord(modelRecord, groups));

/**
 *
 * returns a memoized constant value from the passed field and value pair.
 *
 */
const createConstant = memoize((field, value) => ({ field, value }), generateKeyFromValue);

/**
 *
 * get cached record
 */
const getStringifieldRecordMemoized = memoize(
    (record: RecordWithId) => JSON.stringify(record),
    record => record,
);

/**
 *
 * Generates a unique object for the record.
 * This is only for memoization. the record generated will always be unique given a memoized record and group pair.
 *
 */
const generateRecordId = <T extends RecordWithId = RecordWithId>(
    modelRecord: T,
    groups: string[],
    index?: number,
) =>
    [getStringifieldRecordMemoized(modelRecord), generateValueKey(modelRecord, groups), index].join(
        '__',
    );

/**
 *
 * From the normalized aggregations provided, extract the group fields.
 *
 */
const extractGroupFields = memoize(
    (groupedData: GroupMetaRow[]) => {
        for (const row of groupedData) {
            if (!row.isLastLevel) continue;
            return row.groupConstants.map(({ field }) => field);
        }

        return [];
    },
    groups => groups.join(','),
);

/**
 *
 * Takes a record of type RecordWithId and prepares the record for grouping.
 * Adds indexInGroup property though they'll be replaced later.
 */
const prepareGroupedRecord = memoize(
    <T extends RecordWithId = RecordWithId>(
        record: T,
        groups: string[],
        index: number,
    ): GroupRecord => ({
        data: record,
        id: record.id,
        level: groups.length,
        groupId: generateValueKey(record, groups),
        groupConstants: getMemoizedConstants(generateConstantsForRecord(record, groups)),
        isCollapsed: false,
        rowType: RowType.DATA as const,
        index,
        // Index in group will be overwritten later.
        indexInGroup: 0,
    }),
    (record, groups) => generateRecordId(record, groups),
);

/**
 *
 * Add the indexInGroup Prop
 */
const prepareRecordWithIndex = memoize(
    <T extends RecordWithId>(record: T, indexInGroup: number) => ({
        ...record,
        indexInGroup,
    }),
    (record, indexInGroup) => `${getStringifieldRecordMemoized(record)}-ig:${indexInGroup}`,
);

/**
 * Takes a set of records and returns row ids.
 * It's memoized so that data updates don't trigger a rerender of the Flatlist.
 */
const _getRowIds = (records: GroupedData[]) => records.map(({ id }) => id);
export const getRowIds = memoize(_getRowIds, records => _getRowIds(records).join('__'));

/**
 *
 * Takes aggregations and parses them into header and footer rows (GroupMetaRow).
 *
 */
export const prepareAggregateRow: NormalizeAggregatesFunc = memoize(
    ({ children, ...aggregateRow }, groupConstants, index: number, totalItems: number) => {
        groupConstants = getMemoizedConstants([
            ...groupConstants,
            createConstant(aggregateRow.field, aggregateRow.value),
        ]);

        const subGroups = children.map((child, i) =>
            prepareAggregateRow(child, groupConstants, i, children.length),
        );
        const groupId = generateGroupId(groupConstants);

        const title =
            !Array.isArray(aggregateRow.value) || typeof aggregateRow.value.at(0) === 'object'
                ? aggregateRow.value
                : aggregateRow.value[0];

        const sharedProps = {
            ...aggregateRow,
            groupConstants,
            groupId,
            title,
            level: groupConstants.length,
            index,
            isFirstLevel: groupConstants.length === 1,
            isLastLevel: children.length === 0,
            isFirst: index === 0,
            isLast: totalItems - 1 === index,
            isOnly: totalItems === 1,
            isRealGroup: true,
            isCollapsed: false,
        };

        const header: GroupHeader = {
            ...sharedProps,
            id: `${groupId}::header`,
            rowType: RowType.HEADER,
        };

        const footer: GroupFooter = {
            ...sharedProps,
            id: `${groupId}::footer`,
            rowType: RowType.FOOTER,
        };

        return [header, ...subGroups.flat(), footer];
    },
);

/**
 * Accept a list of records and GroupMetaRows and convertes it into a normalized records.
 */
export const prepareGroupedData = <T extends RecordWithId = RecordWithId>(
    modelRecords: T[],
    groupRecordsBy: GroupMetaRow[] = [],
) => {
    const groups = extractGroupFields(groupRecordsBy);
    const normalizedModelRecords = modelRecords.map((record, rowIndex) =>
        prepareGroupedRecord(record, groups, rowIndex),
    );
    const groupedRecords: Record<string, GroupRecord[]> = groupBy(normalizedModelRecords, record =>
        generateValueKey(record.data, groups),
    );

    if (!groupRecordsBy.length)
        return [
            ...normalizedModelRecords,
            {
                count: modelRecords.length,
                groupConstants: defaultConstants,
                groupId: '',
                title: '',
                level: 0,
                index: modelRecords.length,
                isFirstLevel: true,
                isLastLevel: true,
                isFirst: true,
                isLast: true,
                isOnly: modelRecords.length === 0,
                isRealGroup: true,
                isCollapsed: false,
                id: `empty::footer`,
                rowType: RowType.FOOTER,
            },
        ];

    return groupRecordsBy.reduce((groupedAggregates: GroupedData[], group) => {
        groupedAggregates = [...groupedAggregates, group];
        if (!isGroupHeader(group)) return groupedAggregates;
        if (!(group as GroupHeader).isLastLevel) return groupedAggregates;

        return [
            ...groupedAggregates,
            ...Array.from({ length: group.count }, (_, indexInGroup) =>
                prepareRecordWithIndex(
                    groupedRecords[group.groupId]?.[indexInGroup] ?? {
                        id: `${group.groupId};unknown:${indexInGroup}`,
                        level: group.level,
                        groupId: group.groupId,
                        groupConstants: group.groupConstants,
                        rowType: RowType.DATA as const,
                        isCollapsed: false,
                    },
                    indexInGroup,
                ),
            ),
        ];
    }, []);
};
export default prepareGroupedData;
