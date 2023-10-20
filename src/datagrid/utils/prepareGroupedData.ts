import { memoize, allArgumentResolver } from './lodash';

import type {
    GroupConstantValues,
    GroupedData,
    GroupFooter,
    GroupHeader,
    GroupMetaRow,
    GroupRecord,
    NormalizeAggregatesFunc,
} from './grouping.types';
import { RowType } from './grouping.types';
import type { TDataTableColumn } from '@bambooapp/bamboo-molecules';

export const isGroupFooter = (x: GroupedData): x is GroupFooter => x!.rowType === RowType.FOOTER;
export const isGroupHeader = (x: GroupedData): x is GroupHeader => x!.rowType === RowType.HEADER;
export const isDataRow = (x: GroupedData): x is GroupRecord => x!.rowType === RowType.DATA;

/**
 *
 * Normalize a value of any type into string.
 *
 *
 */
const toStringValue = (value: unknown) => allArgumentResolver(value);

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
 * returns a memoized constant value from the passed field and value pair.
 *
 */
const createConstant = memoize(
    (field: TDataTableColumn, value: unknown) => ({ field, value }),
    generateKeyFromValue,
);

/**
 * Takes a set of records and returns row ids.
 * It's memoized so that data updates don't trigger a rerender of the Flatlist.
 */
const _getRowIds = (records: GroupedData[]) => records.map(record => record?.id);
export const getRowIds = memoize(_getRowIds, records => _getRowIds(records).join('__'));

// const getRecordsById = memoize((records: GroupRecord[]) => keyBy(records, 'id'));

/**
 *
 * Takes aggregations and parses them into header and footer rows (GroupMetaRow).
 *
 */
export const prepareAggregateRow: NormalizeAggregatesFunc = memoize(
    (
        { children, field, value, ...aggregateRow },
        groupConstants,
        index,
        lastIndex,
        startIndex,
        totalItems: number,
        groupIdRoot = '',
    ) => {
        groupConstants = getMemoizedConstants([...groupConstants, createConstant(field, value)]);

        // Group Id doesn't depend on the value
        const groupId = [groupIdRoot, `${index}`].filter(Boolean).join('_');

        const isLastLevel = children.length === 0;

        const title = !Array.isArray(value) || typeof value.at(0) === 'object' ? value : value[0];

        const sharedProps = {
            ...aggregateRow,
            groupConstants,
            groupId,
            title,
            isLastLevel,
            level: groupConstants.length,
            isFirstLevel: groupConstants.length === 1,
            isFirst: index === 0,
            isLast: totalItems - 1 === index,
            isOnly: totalItems === 1,
            isRealGroup: true,
            isCollapsed: false,
        };

        const header: GroupHeader = {
            index: startIndex++,
            field,
            value,
            realIndex: lastIndex++,
            rowType: RowType.HEADER,
            id: `${groupId}::header`,
            ...sharedProps,
        };

        const subGroups = children.reduce(
            (array: GroupMetaRow[], child, childIndex) =>
                array.concat(
                    prepareAggregateRow(
                        child,
                        groupConstants,
                        childIndex,
                        !array.length ? lastIndex++ : array.at(-1)!.realIndex + 1,
                        !array.length ? startIndex++ : array.at(-1)!.index + 1,
                        children.length,
                        groupId,
                    ),
                ),
            [],
        );

        const footer: GroupFooter = {
            index: subGroups.length ? subGroups.at(-1)!.index + 1 : startIndex + aggregateRow.count,
            field,
            value,
            realIndex: lastIndex++,
            rowType: RowType.FOOTER,
            id: `${groupId}::footer`,
            ...sharedProps,
        };

        return [header, ...subGroups, footer];
    },
    allArgumentResolver,
);

export const findGroupIds = (arg: GroupMetaRow[]) =>
    arg.reduce(
        (groupIds: Record<number, string>, group) =>
            isGroupFooter(group) || !group.isLastLevel
                ? groupIds
                : { ...groupIds, [group.index]: group.groupId },
        [],
    );

export const getRelatedGroupByIndex = memoize(
    (records: GroupedData[], index: number): Exclude<GroupedData, undefined> => {
        if (index < -1)
            return {
                level: 0,
                groupId: '',
                id: '',
                rowType: 'data' as const,
                index: 0,
                groupConstants: [],
                indexInGroup: 0,
            };

        const record = records[index];
        if (record) return record;

        return getRelatedGroupByIndex(records, index - 1);
    },
    allArgumentResolver,
);

// TODO: Revisit Groupby - Add way to add correct id.
export const getRecordByIndex = memoize(
    (records: GroupedData[], index: number): Exclude<GroupedData, undefined> => {
        const record = records[index];
        if (record) return record;

        const group = getRelatedGroupByIndex(records, index)!;

        return {
            level: group.level,
            groupId: group.groupId,
            index,
            id: -1,
            rowType: 'data',
            indexInGroup: index - group.index,
            groupConstants: group.groupConstants,
        };
    },
    allArgumentResolver,
);

// TODO: Revisit Groupby - Add way to add correct id.
export const getRecordByIndexNoId = memoize(
    (records: GroupedData[], index: number): Exclude<Omit<GroupedData, 'id'>, undefined> => {
        const { id: _, ...record } = getRecordByIndex(records, index);
        return record;
    },
    allArgumentResolver,
);
