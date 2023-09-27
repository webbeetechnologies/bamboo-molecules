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
import type { TDataTableColumn } from '@bambooapp/bamboo-molecules';

export const isGroupFooter = (x: GroupedData): x is GroupFooter => x.rowType === RowType.FOOTER;
export const isGroupHeader = (x: GroupedData): x is GroupHeader => x.rowType === RowType.HEADER;
export const isDataRow = (x: GroupedData): x is GroupHeader => x.rowType === RowType.DATA;

const defaultConstants: GroupConstantValues[] = [];

const getDefaultFooterRow = memoize(
    (recordsCount: number): GroupFooter => ({
        count: recordsCount,
        groupConstants: defaultConstants,
        groupId: '',
        title: '',
        level: 0,
        isFirstLevel: true,
        isLastLevel: true,
        isFirst: true,
        isLast: true,
        isOnly: recordsCount === 0,
        isRealGroup: true,
        isCollapsed: false,
        id: `empty::footer`,
        uniqueId: `empty::footer`,
        rowType: RowType.FOOTER,
    }),
);

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
const generateKeyFromValue = (key: TDataTableColumn, value: unknown) => {
    return `k:${key}:v${toStringValue(value)}`;
};

/**
 *
 * generate a group ID from the passed constant values.
 *
 */
const generateGroupId = (constants: GroupConstantValues[]) =>
    constants.map(({ field, value }) => generateKeyFromValue(field, value)).join(';');

const getMemoizedConstants = memoize(
    (constants: GroupConstantValues[]) => constants,
    generateGroupId,
);

/**
 *
 * Takes a record and the array of strings as groups,
 * generates group constants for the record
 *
 */
const generateConstantsForRecord = (
    modelRecord: Record<TDataTableColumn, unknown>,
    groups: TDataTableColumn[],
) => groups.map(key => createConstant(key, modelRecord[key]));

/**
 *
 * Takes a record, and the group by fields.
 * Returns a string of
 *
 */
const generateValueKey = (
    modelRecord: Record<TDataTableColumn, unknown>,
    groups: TDataTableColumn[],
) => generateGroupId(generateConstantsForRecord(modelRecord, groups));

/**
 *
 * returns a memoized constant value from the passed field and value pair.
 *
 */
const createConstant = memoize(
    (field: TDataTableColumn, value: unknown) => ({ field, value }),
    generateKeyFromValue,
);

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
    groups: TDataTableColumn[],
) => [getStringifieldRecordMemoized(modelRecord), generateValueKey(modelRecord, groups)].join('__');

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
    <T extends RecordWithId = RecordWithId>(record: T, groups: TDataTableColumn[]): GroupRecord => {
        const groupConstants = getMemoizedConstants(generateConstantsForRecord(record, groups));
        return {
            data: record,
            id: record.id,
            level: groups.length,
            groupId: generateGroupId(groupConstants),
            groupConstants,
            isCollapsed: false,
            rowType: RowType.DATA as const,

            // uniqueId will be overwritten later.
            uniqueId: record.id + '',
            // Index in group will be overwritten later.
            index: 0,
            // IndexInGroup in group will be overwritten later.
            indexInGroup: 0,
        };
    },
    (record, groups) => generateRecordId(record, groups),
);

/**
 *
 * Add the indexInGroup Prop
 */
const prepareRecordWithIndex = memoize(
    <T extends RecordWithId>(record: T, index: number, indexInGroup?: number) => ({
        ...record,
        uniqueId: `${record.id}-ig:${indexInGroup}`,
        index,
        indexInGroup,
    }),
    (record, indexInGroup, index) =>
        `${getStringifieldRecordMemoized(record)}-i:${index}-ig:${indexInGroup}`,
);

/**
 * Takes a set of records and returns row ids.
 * It's memoized so that data updates don't trigger a rerender of the Flatlist.
 */
const _getRowIds = (records: GroupedData[]) => records.map(({ uniqueId }) => uniqueId);
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
            uniqueId: `${groupId}::header`,
            rowType: RowType.HEADER,
        };

        const footer: GroupFooter = {
            ...sharedProps,
            id: `${groupId}::footer`,
            uniqueId: `${groupId}::footer`,
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
): GroupedData[] => {
    const groups = extractGroupFields(groupRecordsBy);
    const normalizedModelRecords = modelRecords.map(record => prepareGroupedRecord(record, groups));
    const groupedRecords: Record<string, GroupRecord[]> = groupBy(normalizedModelRecords, record =>
        generateValueKey(record.data, groups),
    );

    if (!groupRecordsBy.length)
        return [
            ...normalizedModelRecords.map((record, index) =>
                prepareRecordWithIndex(record, index, index),
            ),
            getDefaultFooterRow(modelRecords.length),
        ];

    let index = 0;
    const finalData = groupRecordsBy.reduce(
        (groupedAggregates: GroupedData[], group, groupIndex) => {
            groupedAggregates = [
                ...groupedAggregates,
                prepareRecordWithIndex(group, groupIndex, undefined),
            ];

            if (!isGroupHeader(group)) return groupedAggregates;
            if (!(group as GroupHeader).isLastLevel) return groupedAggregates;

            return [
                ...groupedAggregates,
                ...Array.from({ length: group.count }, (_, indexInGroup) =>
                    prepareRecordWithIndex(
                        groupedRecords[group.groupId]?.[indexInGroup] ?? {
                            id: `${group.groupId};unknown:${indexInGroup}`,
                            uniqueId: `${group.groupId};unknown:${indexInGroup}`,
                            level: group.level,
                            groupId: group.groupId,
                            groupConstants: group.groupConstants,
                            rowType: RowType.DATA as const,
                            isCollapsed: false,
                        },
                        index++,
                        indexInGroup,
                    ),
                ),
            ];
        },
        [],
    );

    const unRealFooter: GroupFooter = {
        isRealGroup: false,
        groupConstants: defaultConstants,
        level: 0,
        groupId: '',
        id: 'last-footer-row',
        uniqueId: 'last-footer-row',
        isCollapsed: false,
        rowType: RowType.FOOTER,
        isFirstLevel: false,
        isLastLevel: false,
        isFirst: false,
        isLast: false,
        isOnly: false,
        count: 0,
        title: '',
    };

    return [...finalData, unRealFooter];
};
export default prepareGroupedData;
