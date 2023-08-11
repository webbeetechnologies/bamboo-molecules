import { memo, MutableRefObject, PropsWithChildren, RefObject, useCallback, useMemo } from 'react';
import type { TDataTableColumn, TDataTableRow } from '@bambooapp/bamboo-molecules/components';
import { createFastContext } from '@bambooapp/bamboo-molecules/fast-context';

import type { GroupedData, GroupHeader, GroupFooter } from '../utils';
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

type GroupedDataMap = Record<TDataTableColumn, GroupedData>;
const getRecordsMap = weakMemoized((records: GroupedData[]) => keyBy(records, 'id')) as (
    records: GroupedData[],
) => GroupedDataMap;
export const useRecordsMap = () => {
    return useTableManagerValueSelector(({ records }) => getRecordsMap(records));
};

export const useRecordById = (id: TDataTableRow) => {
    return useTableManagerValueSelector(({ records }) => getRecordsMap(records)[id]);
};

export const useHasGroupedData = (id: TDataTableRow) => {
    return !!useRecordById(id).groupId;
};

export const useGroupMeta = (id: TDataTableRow): GroupMeta => {
    const {
        fieldId,
        title,
        recordCount,
        isFirst,
        isLast,
        isFirstLevel,
        isLastLevel,
        isOnly,
        title: value,
        level,
        groupConstants,
        rowType,
    } = useRecordById(id) as GroupHeader | GroupFooter;

    return useMemo(
        () => ({
            fieldId,
            title,
            level,
            recordCount,
            isFirst,
            isLast,
            isFirstLevel,
            isLastLevel,
            isOnly,
            value,
            groupConstants,
            rowType,
        }),
        [
            fieldId,
            title,
            level,
            recordCount,
            isFirst,
            isLast,
            isFirstLevel,
            isLastLevel,
            isOnly,
            value,
            groupConstants,
            rowType,
        ],
    );
};

export const useRecordType = (id: TDataTableRow) => {
    return useTableManagerValueSelector(({ records }) => getRecordsMap(records)[id].rowType);
};
