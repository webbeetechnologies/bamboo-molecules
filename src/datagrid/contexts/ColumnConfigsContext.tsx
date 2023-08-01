import { createFastContext } from '@bambooapp/bamboo-molecules/fast-context';
import { memo, ReactNode, useMemo } from 'react';

export const DEFAULT_COLUMN_WIDTH = 150;

export type ColumnConfigsContextType = {
    hiddenColumns?: Record<string, boolean>;
    columnsWidths?: Record<string, number>;
};

export const {
    Provider: ColumnConfigsContextProvider,
    useContext: useColumnConfigsSelector,
    useContextValue: useColumnConfigsValueSelector,
    useStoreRef: useColumnConfigsStoreRef,
} = createFastContext<ColumnConfigsContextType>(true);

export const ColumnConfigsProvider = memo(
    ({
        hiddenColumns,
        columnsWidths,
        children,
    }: ColumnConfigsContextType & { children: ReactNode }) => {
        const contextValue = useMemo(
            () => ({
                hiddenColumns,
                columnsWidths,
            }),
            [columnsWidths, hiddenColumns],
        );

        return (
            <ColumnConfigsContextProvider value={contextValue}>
                {children}
            </ColumnConfigsContextProvider>
        );
    },
);

export const useColumnWidth = (columnId: string) =>
    useColumnConfigsValueSelector(
        store => store?.columnsWidths?.[columnId] || DEFAULT_COLUMN_WIDTH,
    );

export const useIsColumnHidden = (columnId: string) =>
    useColumnConfigsValueSelector(store => store?.hiddenColumns?.[columnId] || false);
