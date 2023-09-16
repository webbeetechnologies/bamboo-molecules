import { useCallback } from 'react';
import {
    CELL_FOCUS_PLUGIN_KEY,
    CellIndices,
    usePluginsDataStoreRef,
    useTableManagerStoreRef,
} from '@bambooapp/bamboo-molecules/datagrid';
import {
    useDataTableHorizontalScrollIndexStoreRef,
    useDataTableStoreRef,
} from '@bambooapp/bamboo-molecules/components';

import { isNil } from '../../../utils';
import { useSetFocusCellPluginStore } from './useSetFocusCellPluginStore';

const directions = ['up', 'down', 'left', 'right'] as const;
type Direction = typeof directions[number];

export const useSetFocusCellByDirection = () => {
    const { store: pluginsStoreRef } = usePluginsDataStoreRef();
    const { store: dataTableStoreRef } = useDataTableStoreRef();
    const { store: tableManagerStore } = useTableManagerStoreRef();

    const scrollToCell = useScrollToCell();
    const setFocusCell = useSetFocusCellPluginStore();

    return useCallback(
        (direction: Direction, scrollToEdge: boolean = false) => {
            if (!directions.includes(direction)) return;

            const currentFocusedCell = pluginsStoreRef.current[CELL_FOCUS_PLUGIN_KEY]?.focusedCell;

            if (!currentFocusedCell) return;

            const { columnIndex, rowIndex } = currentFocusedCell as {
                columnIndex: number;
                rowIndex?: number;
            };

            if (isNil(rowIndex) || isNil(columnIndex)) return;

            const { columns } = dataTableStoreRef.current;
            const { records } = tableManagerStore.current;

            let newRowIndex = rowIndex;
            let newColumnIndex = columnIndex;

            if (direction === 'up' || direction === 'down') {
                if (direction === 'up') {
                    if (rowIndex === 0) return;

                    newRowIndex = scrollToEdge ? 0 : newRowIndex - 1;

                    // keep finding the rowIndex unless the type is data
                    while (records[newRowIndex]?.rowType !== 'data') {
                        newRowIndex = scrollToEdge ? newRowIndex + 1 : newRowIndex - 1;

                        if (scrollToEdge ? newRowIndex > records?.length - 1 : newRowIndex <= 0)
                            return;
                    }
                } else {
                    if (rowIndex === records?.length - 1) return;

                    newRowIndex = scrollToEdge ? records?.length - 1 : newRowIndex + 1;

                    // keep finding the rowIndex unless the type is data
                    while (records[newRowIndex]?.rowType !== 'data') {
                        newRowIndex = scrollToEdge ? newRowIndex - 1 : newRowIndex + 1;

                        if (scrollToEdge ? newRowIndex <= 0 : newRowIndex > records?.length - 1)
                            return;
                    }
                }
            }
            // the only possible values are left or right
            if (direction === 'left' || direction === 'right') {
                if (direction === 'left') {
                    if (columnIndex === 0) return;

                    newColumnIndex = scrollToEdge ? 0 : newColumnIndex - 1;
                } else {
                    if (newColumnIndex === columns?.length - 1) return;

                    newColumnIndex = scrollToEdge ? columns?.length - 1 : newColumnIndex + 1;
                }
            }

            setFocusCell(prev => ({
                ...prev,
                focusedCell: {
                    rowId: records[newRowIndex]?.id,
                    columnId: columns[newColumnIndex],
                    columnIndex: newColumnIndex,
                    rowIndex: newRowIndex,
                    type: 'cell',
                },
            }));

            scrollToCell({ columnIndex: newColumnIndex, rowIndex: newRowIndex });
        },
        [dataTableStoreRef, pluginsStoreRef, scrollToCell, setFocusCell, tableManagerStore],
    );
};

const useScrollToCell = () => {
    const { store: dataTableStoreRef } = useDataTableStoreRef();
    const { store: tableManagerStore } = useTableManagerStoreRef();
    const { store: horizontalScrollIndexStoreRef } = useDataTableHorizontalScrollIndexStoreRef();

    return useCallback(
        ({ columnIndex, rowIndex }: CellIndices) => {
            tableManagerStore.current.tableFlatListRef?.current?.scrollToIndex({
                index: rowIndex,
                animated: false,
            });

            const left = dataTableStoreRef.current.cellXOffsets[columnIndex];
            const cellWidth = dataTableStoreRef.current.columnWidths?.[columnIndex] || 0;
            const containerWidth = dataTableStoreRef.current.containerWidth || 0;

            const checkLeft = (x: number, offset: number) => left + cellWidth >= x - offset;
            const checkRight = (x: number, offset: number) => left <= x + offset + containerWidth;

            if (
                checkLeft(horizontalScrollIndexStoreRef.current.x, 0) &&
                checkRight(horizontalScrollIndexStoreRef.current.x, 0)
            )
                return;

            tableManagerStore.current.tableRef?.current?.scrollTo({
                x: left,
                animated: false,
            });
        },
        [dataTableStoreRef, horizontalScrollIndexStoreRef, tableManagerStore],
    );
};
