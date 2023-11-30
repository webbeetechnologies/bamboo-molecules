import { createRef, memo, MutableRefObject, PropsWithChildren, RefObject, useMemo } from 'react';
import type {
    LoadMoreRowsArg,
    TDataTableColumn,
    TDataTableRowTruthy,
} from '@bambooapp/bamboo-molecules/components';
import { createFastContext } from '@bambooapp/bamboo-molecules/fast-context';

import type { GroupConstantValues, GroupedData, GroupedDataTruthy, GroupMetaRow } from '../utils';
import { weakMemoized, keyBy, GroupMeta, getRowIds, isDataRow, getRecordByIndex } from '../utils';
import { shallowCompare } from '../../utils';

import { useGetRowId } from '../../components/DataTable';
import type { InfiniteLoader, VariableSizeList } from '@bambooapp/virtualized-list';

export type TableManagerContextProviderProps = {
    withContextMenu: boolean;
    records: GroupedData[];
    tableRef: RefObject<any>;
    spacerWidth: number;
    focusIgnoredColumns?: TDataTableColumn[];
    useGetRowId: (
        record: Exclude<GroupedDataTruthy, undefined>,
        currentRowId?: TDataTableRowTruthy,
    ) => { id: TDataTableRowTruthy; indexInGroup: number } | null;

    getRowId: (index: number) => TDataTableRowTruthy | null;
    hasRowLoaded: (index: number) => boolean;
    isEditing?: boolean;
};

export type TableManagerContextType = TableManagerContextProviderProps & {
    tableVirtualListRef: RefObject<VariableSizeList>;
    infiniteLoaderRef: RefObject<InfiniteLoader>;
    visibleRowsRef: MutableRefObject<LoadMoreRowsArg | null>;
};

const defaultContextValue: TableManagerContextType = {
    isEditing: false,
    withContextMenu: false,
    spacerWidth: 0,
    records: [],
    tableRef: createRef(),
    tableVirtualListRef: createRef(),
    infiniteLoaderRef: createRef(),
    visibleRowsRef: { current: {} as LoadMoreRowsArg },
    focusIgnoredColumns: [],
    useGetRowId: record => ({ id: record.index, indexInGroup: record.index }),
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
        useGetRowId: useGetRowIdProp,
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
                    useGetRowId: useGetRowIdProp,
                } as TableManagerContextType),
            [
                tableRef,
                withContextMenu,
                records,
                spacerWidth,
                focusIgnoredColumns,
                getRowId,
                hasRowLoaded,
                useGetRowIdProp,
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
    return useTableManagerValueSelector(({ records }) => records.at(0)?.rowType === 'header');
};

const defaultArray: unknown[] = [];
export const useGroupMeta = (rowIndex: number): GroupMeta => {
    const record = useFindRecordWithIndex(rowIndex);

    return useMemo(() => {
        const isData = isDataRow(record);
        return {
            groupId: record.groupId,
            level: record.level,
            rowType: record.rowType,
            fieldId: isData ? null : (record as GroupMetaRow).fieldId,
            value: !isData && (record as GroupMetaRow).title,
            title: !isData && (record as GroupMetaRow).title,
            count: !isData ? (record as GroupMetaRow).count : 1,
            isFirst: !isData && (record as GroupMetaRow).isFirst,
            isLast: !isData && (record as GroupMetaRow).isLast,
            isFirstLevel: !isData && (record as GroupMetaRow).isFirstLevel,
            isLastLevel: !isData && (record as GroupMetaRow).isLastLevel,
            groupConstants: !isData
                ? record.groupConstants
                : (defaultArray as GroupConstantValues[]),
            isOnly: isData || (record as GroupMetaRow).isOnly,
            isRealGroup: isData || (record as GroupMetaRow).isRealGroup,
            isCollapsed: !isData && (record as GroupMetaRow).isCollapsed,
        };
    }, [record]);
};

export const useFindRecordWithIndex = (index: number) => {
    const rowId = useGetRowId(index);
    return useTableManagerValueSelector(({ records }): Exclude<GroupedData, undefined> => {
        const record = getRecordByIndex(records, index);
        return { ...record, id: rowId ?? record.id! };
    }, shallowCompare);
};
