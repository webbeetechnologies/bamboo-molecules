import { memo, MutableRefObject, PropsWithChildren, RefObject, useCallback, useMemo } from 'react';
import type { TDataTableColumn, TDataTableRow } from '@bambooapp/bamboo-molecules/components';
import { createFastContext } from '@bambooapp/bamboo-molecules/fast-context';

import type { GroupedData, GroupFooter } from '../utils';
import { weakMemoized, keyBy } from '../utils';
import type { GroupMeta } from '../types';

export type TableManagerContextProviderProps = {
    withContextMenu: boolean;
    records: GroupedData[];
    tableRef: RefObject<any>;
    spacerWidth: number;
};

export type TableManagerContextType = TableManagerContextProviderProps & {
    focusedCell: {
        rowIndex?: number;
        columnIndex: number;
        type: 'column' | 'cell';
    } | null;
    focusedCellRef: MutableRefObject<any> | null;
};

const defaultContextValue = {
    focusedCell: null,
    focusedCellRef: null,
    withContextMenu: false,
    spacerWidth: 0,
};

export const {
    Provider: TableManagerContextProvider,
    useContext: useTableManagerSelector,
    useContextValue: useTableManagerValueSelector,
    useStoreRef,
} = createFastContext<TableManagerContextType>(true);

export const TableManagerProvider = memo(
    ({
        tableRef,
        withContextMenu,
        children,
        spacerWidth,
        records,
    }: PropsWithChildren<TableManagerContextProviderProps>) => {
        const contextValue = useMemo(
            () => ({
                ...defaultContextValue,
                tableRef,
                withContextMenu,
                records,
                spacerWidth,
            }),
            [tableRef, withContextMenu, records, spacerWidth],
        );

        return (
            <TableManagerContextProvider value={contextValue}>
                {children}
            </TableManagerContextProvider>
        );
    },
);

export const useTableManagerStoreRef = useStoreRef;

export const useIsCellFocused = (
    rowIndex: number,
    columnIndex: number,
): [boolean, (cell: TableManagerContextType['focusedCell']) => void] => {
    const [isFocused, setStore] = useTableManagerSelector(store => {
        return (
            store.focusedCell?.rowIndex === rowIndex &&
            store.focusedCell?.columnIndex === columnIndex
        );
    });

    const setFocusedCell = useCallback(
        (cell: TableManagerContextType['focusedCell']) => {
            setStore(() => ({
                focusedCell: cell,
            }));
        },
        [setStore],
    );

    return [isFocused, setFocusedCell];
};

export const useShouldContextMenuDisplayed = () => {
    return useTableManagerValueSelector(store => store.withContextMenu);
};

export const deepCompare = (x: any, y: any, depth = Infinity) => {
    if (Object.is(x, y)) return true;
    if (typeof x !== typeof y) return false;
    if (!x || !y) return false;

    if (typeof x === 'object') {
        if (depth === 0) return false;
        const keys = Array.from(new Set(Object.keys({ ...x, ...y })));
        for (const key of keys) {
            if (!deepCompare(x[key], y[key], depth - 1)) return false;
        }
    }

    return false;
};

export const shallowCompare = (x: any, y: any) => deepCompare(x, y, 1);

export const compare = (x: any, y: any) => deepCompare(x, y, 0);

export const useRecordIds = () => {
    return useTableManagerValueSelector(
        ({ records }) => records.map(({ id }) => id),
        shallowCompare,
    );
};

type GroupedDataMap = Record<TDataTableColumn, GroupedData>;
const getRecordsMap = weakMemoized((records: GroupedData[]) => keyBy(records, 'id')) as (
    records: GroupedData[],
) => GroupedDataMap;

const getRecordById = (records: GroupedData[], id: TDataTableRow) => getRecordsMap(records)[id];

export const useRecordsMap = () => {
    return useTableManagerValueSelector(({ records }) => getRecordsMap(records));
};

export const useRecordById = (id: TDataTableRow) => {
    return useTableManagerValueSelector(({ records }) => getRecordById(records, id));
};

export const useHasGroupedData = () => {
    return useTableManagerValueSelector(({ records }) => !!records.at(0)?.groupId);
};

export const useGroupMeta = (id: TDataTableRow): GroupMeta => {
    return useTableManagerValueSelector(({ records }) => {
        const record = getRecordById(records, id) as GroupFooter;

        return {
            fieldId: record.fieldId,
            value: record.title,
            recordCount: record.recordCount,
            isFirst: record.isFirst,
            isLast: record.isLast,
            isFirstLevel: record.isFirstLevel,
            isLastLevel: record.isLastLevel,
            isOnly: record.isOnly,
            title: record.title,
            level: record.level,
            groupConstants: record.groupConstants,
            rowType: record.rowType,
            isRealGroup: record.isRealGroup,
        };
    }, shallowCompare);
};

export const useRecordType = (id: TDataTableRow) => {
    return useTableManagerValueSelector(({ records }) => getRecordsMap(records)[id].rowType);
};
