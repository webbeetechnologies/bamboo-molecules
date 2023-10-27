import { memoize, allArgumentResolver } from './lodash';

import type {
    GroupConstantValues,
    GroupedData,
    GroupedDataTruthy,
    GroupFooter,
    GroupHeader,
    GroupMetaRow,
    GroupRecord,
    NormalizeAggregatesFunc,
    RecordWithId,
} from './grouping.types';
import { RowType } from './grouping.types';
import type { TDataTableColumn } from '@bambooapp/bamboo-molecules';

type NarrowGroupRecordArg = Partial<GroupedDataTruthy> & Pick<GroupedDataTruthy, 'rowType'>;
export const isGroupFooter = (x: NarrowGroupRecordArg): x is GroupFooter =>
    x!.rowType === RowType.FOOTER;
export const isGroupHeader = (x: NarrowGroupRecordArg): x is GroupHeader =>
    x!.rowType === RowType.HEADER;
export const isDataRow = (x: NarrowGroupRecordArg): x is GroupRecord => x!.rowType === RowType.DATA;

const defaultConstants: GroupConstantValues[] = [];

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
        totalItems,
        collapsedState,
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
            isCollapsed: !!collapsedState[groupId],
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

        const subGroups = collapsedState[groupId]
            ? []
            : children.reduce(
                  (array: GroupMetaRow[], child, childIndex) =>
                      array.concat(
                          prepareAggregateRow(
                              child,
                              groupConstants,
                              childIndex,
                              !array.length ? lastIndex++ : array.at(-1)!.realIndex + 1,
                              !array.length ? startIndex++ : array.at(-1)!.index + 1,
                              children.length,
                              collapsedState,

                              // Optional Params
                              groupId,
                          ),
                      ),
                  [],
              );

        const footerIndexOffset = collapsedState[groupId] ? 0 : aggregateRow.count;
        const footer: GroupFooter = {
            index: subGroups.length ? subGroups.at(-1)!.index + 1 : startIndex + footerIndexOffset,
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

export const DATAGRID_DEFAULT_GROUP = 'ALL';
export const getRelatedGroupByIndex = memoize(
    (records: GroupedData[], index: number): Exclude<GroupedData, undefined> => {
        if (index < 0)
            return {
                level: 0,
                groupId: DATAGRID_DEFAULT_GROUP,
                id: '',
                rowType: 'data' as const,
                index: 0,
                groupConstants: defaultConstants,
                indexInGroup: 0,
                realIndex: 0,
                isPlaceholder: true,
                groupIndex: 0,
            };

        const record = records[index];
        if (record) return record;

        return getRelatedGroupByIndex(records, index - 1);
    },
    allArgumentResolver,
);

// TODO: Revisit Groupby - Add way to add correct id.
export const getRecordByIndex = memoize(
    (records: GroupedData[], index: number): GroupedDataTruthy => {
        const record = records[index];
        if (record) return record;

        const referenceRow = getRelatedGroupByIndex(records, index)!;

        const isMetaRow = !isDataRow(referenceRow);

        return {
            level: referenceRow.level,
            groupId: referenceRow.groupId,
            index,
            id: undefined,
            rowType: 'data',
            groupConstants: referenceRow.groupConstants,
            indexInGroup: !isMetaRow ? index : index - referenceRow.index - 1,
            realIndex: !isMetaRow ? index : index - referenceRow.realIndex - 1,
            isPlaceholder: true,
            groupIndex: isDataRow(referenceRow) ? referenceRow.groupIndex : referenceRow.index,
        };
    },
    allArgumentResolver,
);

// TODO: Revisit Groupby - Add way to add correct id.
export const getRecordByIndexNoId = memoize(
    (records: GroupedData[], index: number): Omit<GroupedDataTruthy, 'id'> => {
        const { id: _, ...record } = getRecordByIndex(records, index);
        return record;
    },
    allArgumentResolver,
);

export const prepareGroupRecord = memoize(
    (
        record: RecordWithId,
        index,
        {
            level = 0,
            groupId = DATAGRID_DEFAULT_GROUP,
            rowType = 'data',
            indexInGroup = index,
            groupConstants = defaultConstants,
            realIndex = index,
        }: Partial<Omit<GroupRecord, 'id' | 'index'>> = {},
    ): GroupRecord => ({
        id: record.id,
        level,
        groupId,
        index,
        rowType,
        indexInGroup,
        groupConstants,
        realIndex,
        groupIndex: 0,
    }),
    allArgumentResolver,
);
