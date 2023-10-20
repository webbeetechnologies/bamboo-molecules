import { createRef, memo, PropsWithChildren, RefObject, useMemo } from 'react';
import type { TDataTableColumn, TDataTableRowTruthy } from '@bambooapp/bamboo-molecules/components';
import { createFastContext } from '@bambooapp/bamboo-molecules/fast-context';

import type { GroupConstantValues, GroupedData } from '../utils';
import { weakMemoized, keyBy, GroupMeta, getRowIds, isDataRow, getRecordByIndex } from '../utils';
import { shallowCompare } from '../../utils';

export type TableManagerContextProviderProps = {
    withContextMenu: boolean;
    records: GroupedData[];
    tableRef: RefObject<any>;
    spacerWidth: number;
    focusIgnoredColumns?: TDataTableColumn[];
    getRowId: (index: number) => TDataTableRowTruthy;
    hasRowLoaded: (index: number) => boolean;
    isEditing?: boolean;
};

export type TableManagerContextType = TableManagerContextProviderProps & {
    tableFlatListRef: RefObject<any>;
};

const defaultContextValue: TableManagerContextType = {
    isEditing: false,
    withContextMenu: false,
    spacerWidth: 0,
    records: [],
    tableRef: createRef(),
    tableFlatListRef: createRef(),
    focusIgnoredColumns: [],
    getRowId: index => index,
    hasRowLoaded: () => true,
};

export const {
    Provider: TableManagerContextProvider,
    useContext: useTableManagerSelector,
    useContextValue: useTableManagerValueSelector,
    useStoreRef,
} = createFastContext<TableManagerContextType>(defaultContextValue, true);

export const TableManagerProvider = memo(
    ({
        tableRef,
        withContextMenu,
        children,
        spacerWidth,
        records,
        focusIgnoredColumns,
        getRowId,
        hasRowLoaded,
    }: PropsWithChildren<TableManagerContextProviderProps>) => {
        const contextValue = useMemo(
            () =>
                ({
                    tableRef,
                    withContextMenu,
                    records,
                    spacerWidth,
                    focusIgnoredColumns,

                    getRowId,
                    hasRowLoaded,
                } as TableManagerContextType),
            [
                tableRef,
                withContextMenu,
                records,
                spacerWidth,
                focusIgnoredColumns,
                getRowId,
                hasRowLoaded,
            ],
        );

        return (
            <TableManagerContextProvider value={contextValue}>
                {children}
            </TableManagerContextProvider>
        );
    },
);

export const useTableManagerStoreRef = useStoreRef;

export const useShouldContextMenuDisplayed = () => {
    return useTableManagerValueSelector(store => store.withContextMenu);
};

export const useRecordIds = () => {
    return useTableManagerValueSelector(({ records }) => getRowIds(records), shallowCompare);
};

type GroupedDataMap = Record<TDataTableColumn, GroupedData>;
const getRecordsMap = weakMemoized((records: GroupedData[]) => keyBy(records, 'id')) as (
    records: GroupedData[],
) => GroupedDataMap;

export const useRecordsMap = () => {
    return useTableManagerValueSelector(({ records }) => getRecordsMap(records));
};

export const useHasGroupedData = () => {
    return useTableManagerValueSelector(({ records }) => !!records.at(0)?.groupId);
};

const defaultArray: unknown[] = [];
export const useGroupMeta = (rowIndex: number): GroupMeta => {
    const record = useFindRecordWithIndex(rowIndex);
    return useMemo(() => {
        return {
            groupId: record.groupId,
            level: record.level,
            rowType: record.rowType,
            fieldId: isDataRow(record) ? null : record.fieldId,
            value: !isDataRow(record) && record.title,
            title: !isDataRow(record) && record.title,
            count: !isDataRow(record) ? record.count : 1,
            isFirst: !isDataRow(record) && record.isFirst,
            isLast: !isDataRow(record) && record.isLast,
            isFirstLevel: !isDataRow(record) && record.isFirstLevel,
            isLastLevel: !isDataRow(record) && record.isLastLevel,
            groupConstants: !isDataRow(record)
                ? record.groupConstants
                : (defaultArray as GroupConstantValues[]),
            isOnly: isDataRow(record) || record.isOnly,
            isRealGroup: isDataRow(record) || record.isOnly,
            isCollapsed: !isDataRow(record) && record.isCollapsed,
        };
    }, [record]);
};

export const useFindRecordWithIndex = (index: number) => {
    return useTableManagerValueSelector(
        ({ records }): Exclude<GroupedData, undefined> => getRecordByIndex(records, index),
        shallowCompare,
    );
};
