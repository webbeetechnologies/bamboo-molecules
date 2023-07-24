import { memo, MutableRefObject, ReactNode, useCallback, useMemo } from 'react';

import { createFastContext } from '../../fast-context';

export type TableManagerContextType = {
    focusedCell: {
        rowId?: string;
        rowIndex?: number;
        columnId: string;
        columnIndex: number;
        type: 'column' | 'cell';
    } | null;
    focusedCellRef: MutableRefObject<any> | null;
    withContextMenu: boolean;
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
} = createFastContext<TableManagerContextType>();

export const TableManagerProvider = memo(
    ({ withContextMenu, children }: { withContextMenu: boolean; children: ReactNode }) => {
        const contextValue = useMemo(
            () => ({
                ...defaultContextValue,
                withContextMenu,
            }),
            [withContextMenu],
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
    recordId: string,
    fieldId: string,
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
