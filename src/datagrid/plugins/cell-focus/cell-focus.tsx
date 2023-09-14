import { useCallback, useEffect, useMemo } from 'react';
import type { TDataTableRow, TDataTableColumn } from '@bambooapp/bamboo-molecules';
import {
    useDataTableHorizontalScrollIndexStoreRef,
    useDataTableStoreRef,
    useDataTable,
} from '@bambooapp/bamboo-molecules/components';

import { isNil, shallowCompare } from '../../utils';
import { createPlugin } from './createPlugin';
import { CellIndices, FocusedCell, PluginEvents } from './types';
import { usePluginsDataStoreRef, usePluginsDataValueSelector } from './plugins-manager';
import { useNormalizeCellHandler } from './utils';
import { useTableManagerStoreRef } from '../contexts';

export const CELL_FOCUS_PLUGIN_KEY = 'cell-focus';

const useSetFocusCellPluginStore = () => {
    const { store: pluginsStoreRef, set: setPluginsStore } = usePluginsDataStoreRef();
    const {
        beforeFocusCell,
        beforeUnFocusCell,
        onFocusCell,
        onUnFocusCell,
        afterFocusCell,
        afterUnFocusCell,
    } = useCellFocusEvents();
    const normalizeCell = useNormalizeCellHandler();

    return useCallback(
        (
            selector: (
                cellFocusStore: { focusedCell: FocusedCell; isEditing?: boolean } | undefined,
            ) => Partial<{ focusedCell: FocusedCell; isEditing?: boolean } | undefined>,
        ) => {
            const focusedCell = selector(
                pluginsStoreRef.current[CELL_FOCUS_PLUGIN_KEY],
            )?.focusedCell;

            const setStore = () => {
                setPluginsStore(prev => ({
                    [CELL_FOCUS_PLUGIN_KEY]: {
                        ...prev[CELL_FOCUS_PLUGIN_KEY],
                        ...selector(prev[CELL_FOCUS_PLUGIN_KEY]),
                    },
                }));
            };

            if (focusedCell === null) {
                const shouldContinue = beforeUnFocusCell({
                    cell: pluginsStoreRef.current[CELL_FOCUS_PLUGIN_KEY]?.focusedCell
                        ? normalizeCell(pluginsStoreRef.current[CELL_FOCUS_PLUGIN_KEY]?.focusedCell)
                        : null,
                });

                if (shouldContinue === false) return;

                onUnFocusCell();

                setStore();

                afterUnFocusCell();

                return;
            }

            if (focusedCell) {
                const normalizedCell = normalizeCell({
                    ...focusedCell,
                    rowIndex: focusedCell.rowIndex || 0,
                });
                const shouldContinue = beforeFocusCell({ cell: normalizedCell });

                if (shouldContinue === false) return;

                onFocusCell({ cell: normalizedCell });

                setStore();

                afterFocusCell();

                return;
            }

            setStore();
        },
        [
            afterFocusCell,
            afterUnFocusCell,
            beforeFocusCell,
            beforeUnFocusCell,
            normalizeCell,
            onFocusCell,
            onUnFocusCell,
            pluginsStoreRef,
            setPluginsStore,
        ],
    );
};

const useResetFocusCellState = () => {
    const setFocusState = useSetFocusCellPluginStore();

    return useCallback(() => {
        setFocusState(() => ({
            focusedCell: null,
            focusedCellRef: null,
            isEditing: false,
        }));
    }, [setFocusState]);
};

const useIsRowFocused = (rowIndex: TDataTableRow) => {
    return usePluginsDataValueSelector(
        prev => prev[CELL_FOCUS_PLUGIN_KEY]?.focusedCell?.rowIndex === rowIndex,
    );
};

const useFocusedCellRef = () => {
    const { store } = usePluginsDataStoreRef();

    return store.current[CELL_FOCUS_PLUGIN_KEY]?.focusedCellRef || null;
};

const useIsCellFocused = (
    rowId: TDataTableRow,
    columnId: TDataTableColumn,
): {
    isFocused: boolean;
    isEditing: boolean;
} => {
    return usePluginsDataValueSelector(store => {
        const cellFocusStore = store[CELL_FOCUS_PLUGIN_KEY] || {};

        const _isFocused =
            cellFocusStore.focusedCell?.rowId === rowId &&
            cellFocusStore.focusedCell?.columnId === columnId;
        return {
            isFocused: _isFocused,
            isEditing: _isFocused && cellFocusStore.isEditing,
        };
    }, shallowCompare);
};

const useEnsureCorrectFocusCellState = () => {
    const { recordIds, columnIds } = useDataTable(state => ({
        recordIds: state.records,
        columnIds: state.columns,
    }));

    const { recordsMap, columnsMap } = useMemo(
        () => ({
            recordsMap: recordIds.reduce((acc: Record<TDataTableRow, true>, recordId) => {
                acc[recordId] = true;

                return acc;
            }, {}),
            columnsMap: columnIds.reduce((acc: Record<TDataTableColumn, true>, columnId) => {
                acc[columnId] = true;

                return acc;
            }, {}),
        }),
        [columnIds, recordIds],
    );

    const resetFocusState = useResetFocusCellState();
    const isFocusedCellStateCorrect = usePluginsDataValueSelector(state => {
        const { columnId, rowId } = state[CELL_FOCUS_PLUGIN_KEY]?.focusedCell || {};

        return columnsMap[columnId] && recordsMap[rowId];
    });

    useEffect(() => {
        if (isFocusedCellStateCorrect) return;

        resetFocusState();
    }, [isFocusedCellStateCorrect, resetFocusState]);
};

const directions = ['up', 'down', 'left', 'right'] as const;
type Direction = typeof directions[number];

const useSetFocusCellByDirection = () => {
    const { store: pluginsStoreRef } = usePluginsDataStoreRef();
    const { store: dataTableStoreRef } = useDataTableStoreRef();
    const { store: tableManagerStore } = useTableManagerStoreRef();
    const { store: horizontalScrollIndexStoreRef } = useDataTableHorizontalScrollIndexStoreRef();

    const scrollToCell = useScrollToCell();
    const setFocusCell = useSetFocusCellPluginStore();

    return useCallback(
        (direction: Direction) => {
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

                    newRowIndex = newRowIndex - 1;

                    // keep finding the rowIndex unless the type is data
                    while (records[newRowIndex]?.rowType !== 'data') {
                        newRowIndex = newRowIndex - 1;

                        if (newRowIndex <= 0) return;
                    }
                } else {
                    if (rowIndex === records?.length - 1) return;

                    newRowIndex = newRowIndex + 1;

                    // keep finding the rowIndex unless the type is data
                    while (records[newRowIndex]?.rowType !== 'data') {
                        newRowIndex = newRowIndex + 1;

                        if (newRowIndex > records?.length - 1) return;
                    }
                }
            }
            // the only possible values are left or right
            if (direction === 'left' || direction === 'right') {
                if (direction === 'left') {
                    if (columnIndex === 0) return;

                    newColumnIndex = isNil(newColumnIndex) ? 0 : newColumnIndex - 1;
                } else {
                    if (newColumnIndex === columns?.length - 1) return;

                    newColumnIndex = isNil(newColumnIndex) ? 0 : newColumnIndex + 1;
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

export const [useCellFocusPlugin, useCellFocusEvents, useCellFocusMethods] = createPlugin({
    key: CELL_FOCUS_PLUGIN_KEY,
    eventKeys: [
        PluginEvents.BEFORE_FOCUS_CELL,
        PluginEvents.ON_FOCUS_CELL,
        PluginEvents.AFTER_FOCUS_CELL,
        PluginEvents.BEFORE_UNFOCUS_CELL,
        PluginEvents.ON_UNFOCUS_CELL,
        PluginEvents.AFTER_UNFOCUS_CELL,
    ],
    methods: {
        useSetFocusCellPluginStore,
        useIsRowFocused,
        useIsCellFocused,
        useFocusedCellRef,
        useEnsureCorrectFocusCellState,
        useResetFocusCellState,
        useSetFocusCellByDirection,
    },
});
