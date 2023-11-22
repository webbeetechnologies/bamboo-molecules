import { createFastContext } from '@bambooapp/bamboo-molecules/fast-context';

import { useDataTable } from './DataTableContext';
import type { TDataTableColumn } from './types';

export const {
    useStoreRef,
    Provider: HorizontalScrollIndexProvider,
    useContextValue,
} = createFastContext<typeof defaultValue>();

export const defaultValue = {
    x: 0,
    y: 0,
    viewItemIds: [] as TDataTableColumn[],
    scrollXVelocity: 0,
};

export const useIsCellWithinBounds = (columnIndex: number) => {
    const visibleColumnIndices = useDataTable(store => store.visibleColumnIndices ?? []);

    return visibleColumnIndices.includes(columnIndex);
};
