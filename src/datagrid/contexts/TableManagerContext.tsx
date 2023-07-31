import { memo, MutableRefObject, PropsWithChildren, useCallback, useMemo } from 'react';

import { createFastContext } from '../../fast-context';
import { RowType, GroupedData, GroupHeader, GroupFooter } from '../utils';
import { createMemoizedFunction, keyBy } from '../utils';
import type { TDataTableColumn, TDataTableRow } from '../../components/DataTable/types';

export type TableManagerContextProviderProps = {
    withContextMenu: boolean;
    records: GroupedData[];
};

export type TableManagerContextType = TableManagerContextProviderProps & {
    focusedCell: {
        rowId?: TDataTableRow;
        rowIndex?: number;
        columnId: TDataTableColumn;
        columnIndex: number;
        type: 'column' | 'cell';
    } | null;
    focusedCellRef: MutableRefObject<any> | null;
};

const defaultContextValue = {
    focusedCell: null,
    focusedCellRef: null,
    withContextMenu: false,
};

export const {
    Provider: TableManagerContextProvider,
    useContext: useTableManagerSelector,
    useContextValue: useTableManagerValueSelector,
    useStoreRef,
} = createFastContext<TableManagerContextType>(true);

export const TableManagerProvider = memo(
    ({
        withContextMenu,
        children,
        records,
    }: PropsWithChildren<TableManagerContextProviderProps>) => {
        const contextValue = useMemo(
            () => ({
                ...defaultContextValue,
                withContextMenu,
                records,
            }),
            [withContextMenu, records],
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
    recordId: TDataTableRow,
    fieldId: TDataTableColumn,
): [boolean, (cell: TableManagerContextType['focusedCell']) => void] => {
    const [isFocused, setStore] = useTableManagerSelector(store => {
        return store.focusedCell?.rowId === recordId && store.focusedCell?.columnId === fieldId;
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

export const compare = (x: any, y: any) => {
    if (Object.is(x, y)) return true;
    if (typeof x !== typeof y) return false;
    if (!x || !y) return false;

    return x === y;
};

export const deepCompare = (x: any, y: any) => {
    if (compare(x, y)) return true;
    if (typeof x !== typeof y) return false;

    if (!x || !y) return false;

    if (typeof x === 'object') {
        const keys = Array.from(new Set(Object.keys({ ...x, ...y })));
        for (const key of keys) {
            if (!deepCompare(x[key], y(key))) return false;
        }
    }

    return false;
};

export const useRecordIds = () => {
    return useTableManagerValueSelector(({ records }) => records.map(({ id }) => id), compare);
};

const memoized = createMemoizedFunction({
    resolver: x => x,
    Cache: WeakMap,
});

type GroupedDataMap = Record<TDataTableColumn, GroupedData>;
const getRecordsMap = memoized((records: GroupedData[]) => keyBy(records, 'id')) as (
    records: GroupedData[],
) => GroupedDataMap;
export const useRecordsMap = () => {
    return useTableManagerValueSelector(({ records }) => getRecordsMap(records));
};

export const useRecordById = (id: TDataTableRow) => {
    return useTableManagerValueSelector(({ records }) => getRecordsMap(records)[id]);
};

export const useGroupMeta = (id: TDataTableRow) => {
    return useRecordById(id) as GroupHeader | GroupFooter;
};

export const useRecordType = (id: TDataTableRow) => {
    return useTableManagerValueSelector(({ records }) => {
        const arg = getRecordsMap(records)[id];
        if ((arg as GroupHeader).isGroupHeader) return RowType.HEADER;
        if ((arg as GroupFooter).isGroupFooter) return RowType.FOOTER;
        return RowType.DATA;
    });
};
