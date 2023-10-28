import { memoize, allArgumentResolver } from './lodash';

import type {
    GroupConstantValues,
    GroupedData,
    GroupedDataTruthy,
    GroupFooter,
    GroupHeader,
    GroupRecord,
} from './grouping.types';
import { RowType } from './grouping.types';

type NarrowGroupRecordArg = Partial<GroupedDataTruthy> & Pick<GroupedDataTruthy, 'rowType'>;
export const isGroupFooter = (x: NarrowGroupRecordArg): x is GroupFooter =>
    x!.rowType === RowType.FOOTER;
export const isGroupHeader = (x: NarrowGroupRecordArg): x is GroupHeader =>
    x!.rowType === RowType.HEADER;
export const isDataRow = (x: NarrowGroupRecordArg): x is GroupRecord => x!.rowType === RowType.DATA;

const defaultConstants: GroupConstantValues[] = [];

/**
 * Takes a set of records and returns row ids.
 * It's memoized so that data updates don't trigger a rerender of the Flatlist.
 */
const _getRowIds = (records: GroupedData[]) => records.map(record => record?.id);
export const getRowIds = memoize(_getRowIds, records => _getRowIds(records).join('__'));

// const getRecordsById = memoize((records: GroupRecord[]) => keyBy(records, 'id'));

export const DATAGRID_DEFAULT_GROUP = 'ALL';
export const findARecordByIndex = memoize(
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

        return findARecordByIndex(records, index - 1);
    },
    allArgumentResolver,
);

// TODO: Revisit Groupby - Add way to add correct id.
export const getRecordByIndex = memoize(
    (records: GroupedData[], index: number): GroupedDataTruthy => {
        const record = records[index];
        if (record) return record;

        const referenceRow = findARecordByIndex(records, index)!;

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
            groupIndex: referenceRow.groupIndex,
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
