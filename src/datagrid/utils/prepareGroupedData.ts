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
 * get a value key
 */
const generateKeyFromValue = (key: string, value: unknown) => {
    return `k:${key}:v${toStringValue(value)}`;
};

const generateValueKey = <T extends RecordWithId = RecordWithId>(
    modelRecord: T,
    groups: string[],
) => {
    const key = generateConstantsForRecord(modelRecord, groups)
        .map(({ field, value }) => generateKeyFromValue(field, value))
        .join(';');
    return key;
};

const createConstant = memoize((field, value) => ({ field, value }), generateKeyFromValue);

const generateConstantsForRecord = <T extends RecordWithId = RecordWithId>(
    modelRecord: T,
    groups: string[],
) => groups.map(key => createConstant(key, modelRecord[key]));

const generateRecordId = <T extends RecordWithId = RecordWithId>(
    modelRecord: T,
    groups: string[],
) => [generateValueKey(modelRecord, groups), generateKeyFromValue('id', modelRecord.id)].join(';');

const generateGroupId = (constants: GroupConstantValues[]) =>
    constants.map(({ field, value }) => generateKeyFromValue(field, value)).join(';');

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

const generateGroupedRecord = memoize(
    <T extends RecordWithId = RecordWithId>(
        record: T,
        groups: string[],
        index: number,
    ): GroupRecord => ({
        data: record,
        id: record.id,
        level: groups.length,
        groupId: generateValueKey(record, groups),
        groupConstants: generateConstantsForRecord(record, groups),
        isCollapsed: false,
        rowType: RowType.DATA as const,

        // Index in group will be overwritten later.
        indexInGroup: index,
        // Index will be overwritten later.
        index: index,
    }),
    (record, groups, index) => generateRecordId(record, groups) + index,
);

const getRecordWithIndex = memoize(
    <T extends RecordWithId>(record: T, index: number, indexInGroup: number) => ({
        ...record,
        index,
        indexInGroup,
    }),
    (record, index: number, prop) => `${record.id}-${prop}-${index}`,
);

export const prepareGroupedData = <T extends RecordWithId = RecordWithId>(
    modelRecords: T[],
    groupRecordsBy: GroupMetaRow[] = [],
) => {
    const groups = extractGroupFields(groupRecordsBy);
    const normalizedModelRecords = modelRecords.map((record, rowIndex) =>
        generateGroupedRecord(record, groups, rowIndex),
    );
    const groupedRecords: Record<string, GroupRecord[]> = groupBy(normalizedModelRecords, record =>
        generateValueKey(record.data, groups),
    );

    if (!groupRecordsBy.length)
        return [
            ...normalizedModelRecords,
            {
                count: modelRecords.length,
                groupConstants: [],
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
                rowType: RowType.FOOTER as const,
            },
        ];

    let index = 0;
    return groupRecordsBy.reduce((groupedAggregates: GroupedData[], group) => {
        groupedAggregates = [...groupedAggregates, group];
        if (!isGroupHeader(group)) return groupedAggregates;
        if (!(group as GroupHeader).isLastLevel) return groupedAggregates;

        return [
            ...groupedAggregates,
            ...Array.from({ length: group.count }, (_, indexInGroup) =>
                getRecordWithIndex(
                    groupedRecords[group.groupId]?.[indexInGroup] ?? {
                        id: `${group.groupId};unknown:${indexInGroup}`,
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
    }, []);
};

export const prepareAggregateRow: NormalizeAggregatesFunc = memoize(
    ({ children, ...aggregateRow }, groupConstants, index: number, totalItems: number) => {
        groupConstants = [
            ...groupConstants,
            { field: aggregateRow.field, value: aggregateRow.value },
        ];
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
            rowType: RowType.HEADER as const,
        };

        const footer: GroupFooter = {
            ...sharedProps,
            id: `${groupId}::footer`,
            rowType: RowType.FOOTER as const,
        };

        return [header, ...subGroups.flat(), footer];
    },
);

const _getRowIds = (records: GroupedData[]) => records.map(({ id }) => id);
export const getRowIds = memoize(_getRowIds, records => _getRowIds(records).join('__'));
