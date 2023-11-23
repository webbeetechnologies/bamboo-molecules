import { createFastContext } from '@bambooapp/bamboo-molecules/fast-context';

import { useDataTable } from './DataTableContext';
import type { TDataTableColumn } from './types';
import { shallowCompare } from '../../utils';
import { useCallback } from 'react';

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
    return useDataTable(store => (store.visibleColumnIndices ?? []).includes(columnIndex));
};

export const useGetVisibleColumnIndices = (columnOverscanSize: number) => {
    const { columnWidths, defaultColumnWidth, containerWidth, cellXOffsets, numColumns } =
        useDataTable(
            store => ({
                columnWidths: store.columnWidths,
                defaultColumnWidth: store.defaultColumnWidth,
                containerWidth: store.containerWidth || 0,
                numColumns: (store.columns || []).length,
                cellXOffsets: store.cellXOffsets,
            }),
            shallowCompare,
        );

    return useCallback(
        (x: number = 0) => {
            const visibleColumns: number[] = [];

            for (let index = 0; index < numColumns; index++) {
                const left = cellXOffsets[index];
                const cellWidth = columnWidths?.[index] || defaultColumnWidth;

                const isWithinLeftBoundary = left + cellWidth >= x - columnOverscanSize;

                const isWithinRightBoundary = left <= x + columnOverscanSize + containerWidth;

                if (isWithinLeftBoundary && isWithinRightBoundary) {
                    visibleColumns.push(index);
                }

                // we want to break the loop as soon as we found everything
                if (left > x + columnOverscanSize + containerWidth) {
                    break;
                }
            }

            return visibleColumns;
        },
        [
            numColumns,
            cellXOffsets,
            columnWidths,
            defaultColumnWidth,
            columnOverscanSize,
            containerWidth,
        ],
    );
};
