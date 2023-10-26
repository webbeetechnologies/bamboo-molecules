import { createFastContext } from '@bambooapp/bamboo-molecules/fast-context';
import { useCallback, useRef } from 'react';
import type { ViewToken } from 'react-native';

import type { ViewAbilityConfigPair } from 'src/datagrid/types';
import { useDataTable, useDataTableColumnWidth } from './DataTableContext';
import { DEFAULT_VIEWABILITY_CONFIG } from './constants';
import type { TDataTableColumn, TDataTableRowTruthy } from './types';

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

const defaultOffset = 500;

export const useIsCellWithinBounds = (
    left: number,
    rowId: TDataTableRowTruthy,
    columnId: TDataTableColumn,
) => {
    const cellWidth = useDataTableColumnWidth(columnId);
    // this is a quick fix // TODO - revisit this later
    const containerWidth = useDataTable(store => store.containerWidth ?? 0);

    const checkLeft = useCallback(
        (x: number, offset: number) => left + cellWidth >= x - offset,
        [cellWidth, left],
    );
    const checkRight = useCallback(
        (x: number, offset: number) => left <= x + offset + containerWidth,
        [containerWidth, left],
    );
    const isViewableItem = useCallback(
        (viewItemIds: TDataTableColumn[]) => viewItemIds.includes(rowId),
        [rowId],
    );

    return useContextValue(({ x, viewItemIds }) => {
        return (
            checkLeft(x, isViewableItem(viewItemIds) ? defaultOffset : 0) &&
            checkRight(x, isViewableItem(viewItemIds) ? defaultOffset : 0)
        );
    });
};

export const useViewabilityConfigCallbackPairs = (
    viewabilityConfigCallbackPairs: ViewAbilityConfigPair[],
) => {
    const { set: setStore } = useStoreRef();

    const onViewableItemsChanged = useCallback(
        ({ viewableItems }: { viewableItems: ViewToken[] }) => {
            setStore(() => ({
                viewItemIds: viewableItems.map(item => item.item),
            }));
        },
        [setStore],
    );

    return useRef([
        {
            viewabilityConfig: DEFAULT_VIEWABILITY_CONFIG,
            onViewableItemsChanged,
        },
        ...viewabilityConfigCallbackPairs,
    ]);
};
