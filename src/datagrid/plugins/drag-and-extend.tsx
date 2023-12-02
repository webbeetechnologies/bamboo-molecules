import { useCallback } from 'react';

import { useTableManagerStoreRef } from '../contexts';
import { CELL_SELECTION_PLUGIN_KEY } from './cell-selection';
import { usePluginsDataStoreRef, usePluginsDataValueSelector } from './plugins-manager';
import { createPlugin } from './createPlugin';
import { Cell, CellIndices, PluginEvents, SelectionIndices } from './types';
import { checkSelection, useNormalizeCellHandler, useNormalizeSelectionHandler } from './utils';
import { CELL_FOCUS_PLUGIN_KEY } from './cell-focus';
import { getRecordByIndex, isDataRow } from '../utils';

export const DRAG_AND_EXTEND_PLUGIN_KEY = 'drag-and-extend';

const emptyObj = {};

const checkIfWithinRow = (selection: SelectionIndices, cell: { rowIndex: number }) => {
    const { rowIndex } = cell;

    if (!selection || !selection.start || !selection.end) return false;

    const { start, end } = selection;
    const { startRowIndex, endRowIndex } =
        start.rowIndex <= end.rowIndex
            ? { startRowIndex: start.rowIndex, endRowIndex: end.rowIndex }
            : { startRowIndex: end.rowIndex, endRowIndex: start.rowIndex };

    return rowIndex >= startRowIndex && rowIndex <= endRowIndex;
};

const useOnDragStart = () => {
    const { set: setStore } = usePluginsDataStoreRef();

    return useCallback(() => {
        setStore(prev => ({
            [DRAG_AND_EXTEND_PLUGIN_KEY]: {
                ...prev[DRAG_AND_EXTEND_PLUGIN_KEY],
                start: {},
            },
        }));
    }, [setStore]);
};

const useOnDragEnd = () => {
    const { store, set: setPluginsDataStore } = usePluginsDataStoreRef();
    const { beforeDragAndExtend, onDragAndExtend, afterDragAndExtend } =
        useDragAndExtendEvents() || emptyObj;
    const normalizeCell = useNormalizeCellHandler();
    const normalizeSelection = useNormalizeSelectionHandler();

    const focusedCell = store.current[CELL_FOCUS_PLUGIN_KEY]?.focusedCell;

    return useCallback(() => {
        const copySelection = store.current[CELL_SELECTION_PLUGIN_KEY] || {
            start: focusedCell,
            end: focusedCell,
        };
        const { start, end } = store.current[DRAG_AND_EXTEND_PLUGIN_KEY] || emptyObj;

        if (!start && !end) return;

        if (!start || !end || !normalizeCell(start) || !normalizeCell(end)) {
            setPluginsDataStore(() => ({
                [DRAG_AND_EXTEND_PLUGIN_KEY]: undefined,
            }));
            return;
        }

        const args = {
            selection: normalizeSelection(copySelection),
            target: normalizeSelection({
                start: normalizeCell(start) as Cell,
                end: normalizeCell(end) as Cell,
            }),
        };

        const continueDragAndSelection = beforeDragAndExtend(args);

        if (continueDragAndSelection === false) {
            setPluginsDataStore(() => ({
                [DRAG_AND_EXTEND_PLUGIN_KEY]: {},
            }));
            return;
        }

        onDragAndExtend(args);

        setPluginsDataStore(prev => ({
            [DRAG_AND_EXTEND_PLUGIN_KEY]: undefined,
            // clearing cell selection as well
            [CELL_SELECTION_PLUGIN_KEY]: {
                ...prev[CELL_SELECTION_PLUGIN_KEY],
                start: prev[CELL_SELECTION_PLUGIN_KEY]?.start || focusedCell,
                end: prev[DRAG_AND_EXTEND_PLUGIN_KEY]?.end,
            },
        }));

        afterDragAndExtend();
    }, [
        afterDragAndExtend,
        beforeDragAndExtend,
        focusedCell,
        normalizeCell,
        normalizeSelection,
        onDragAndExtend,
        setPluginsDataStore,
        store,
    ]);
};

const useOnDragSelection = () => {
    const { store: tableManagerStore } = useTableManagerStoreRef();
    const { store: pluginsDataStore, set: setPluginsDataStore } = usePluginsDataStoreRef();
    const normalizeSelection = useNormalizeSelectionHandler();

    return useCallback(
        ({
            columnIndex,
            rowIndex,
            hovered,
            rowHovered,
        }: {
            columnIndex: number;
            rowIndex: number;
            hovered: boolean;
            rowHovered: boolean;
        }) => {
            // we need hovered because only hovered cell would trigger the event instead of the entire row
            if (
                !pluginsDataStore.current[DRAG_AND_EXTEND_PLUGIN_KEY]?.start ||
                !rowHovered ||
                !hovered
            )
                return;

            const validateDataRow = (index: number) =>
                isDataRow(getRecordByIndex(tableManagerStore.current.records, index));

            if (!validateDataRow(rowIndex)) return;

            const focusedCell = pluginsDataStore.current[CELL_FOCUS_PLUGIN_KEY]?.focusedCell;

            const hasSelection =
                pluginsDataStore.current[CELL_SELECTION_PLUGIN_KEY]?.start &&
                pluginsDataStore.current[CELL_SELECTION_PLUGIN_KEY]?.end;
            // if there is no selection, we use focusedCell
            const cellsSelection = hasSelection
                ? pluginsDataStore.current[CELL_SELECTION_PLUGIN_KEY]
                : {
                      start: focusedCell,
                      end: focusedCell,
                  };

            if (checkSelection(cellsSelection, { columnIndex, rowIndex })) {
                setPluginsDataStore(prev => ({
                    [DRAG_AND_EXTEND_PLUGIN_KEY]: {
                        ...prev[DRAG_AND_EXTEND_PLUGIN_KEY],
                        start: {},
                        end: undefined,
                    },
                }));

                return;
            }

            let selection = {};

            // This means it's horizontal selection
            if (rowHovered && checkIfWithinRow(cellsSelection, { rowIndex })) {
                const startColumnIndexOffset =
                    columnIndex > cellsSelection.end?.columnIndex ? 1 : -1;
                const startColumnIndex = cellsSelection.end?.columnIndex + startColumnIndexOffset;
                const startRowIndex = cellsSelection.start?.rowIndex;
                const endRowIndex = cellsSelection.end?.rowIndex;

                if (!validateDataRow(startRowIndex) || !validateDataRow(endRowIndex)) {
                    setPluginsDataStore(() => ({
                        [DRAG_AND_EXTEND_PLUGIN_KEY]: {},
                    }));
                    return;
                }

                selection = {
                    start: {
                        columnIndex: startColumnIndex,
                        rowIndex: startRowIndex,
                    },
                    end: {
                        columnIndex,
                        rowIndex: endRowIndex,
                    },
                };
            }

            // This means it's vertical selection
            if (rowHovered && !checkIfWithinRow(cellsSelection, { rowIndex })) {
                const startRowIndexOffset = rowIndex > cellsSelection.end?.rowIndex ? 1 : -1;
                const startColumnIndex = cellsSelection.start?.columnIndex;
                const startRowIndex = cellsSelection.end?.rowIndex + startRowIndexOffset;

                const endColumnIndex = cellsSelection.end?.columnIndex;

                if (!validateDataRow(startRowIndex)) {
                    setPluginsDataStore(() => ({
                        [DRAG_AND_EXTEND_PLUGIN_KEY]: {},
                    }));
                    return;
                }

                selection = {
                    start: {
                        columnIndex: startColumnIndex,
                        rowIndex: startRowIndex,
                    },
                    end: {
                        columnIndex: endColumnIndex,
                        rowIndex,
                    },
                };
            }

            selection = normalizeSelection(selection as SelectionIndices);

            setPluginsDataStore(prev => ({
                [DRAG_AND_EXTEND_PLUGIN_KEY]: {
                    ...prev[DRAG_AND_EXTEND_PLUGIN_KEY],
                    ...selection,
                },
            }));
        },
        [setPluginsDataStore, pluginsDataStore, tableManagerStore, normalizeSelection],
    );
};

const useHasDragAndExtendSelection = ({ columnIndex, rowIndex }: CellIndices) => {
    return usePluginsDataValueSelector(store =>
        checkSelection(store[DRAG_AND_EXTEND_PLUGIN_KEY], {
            columnIndex,
            rowIndex,
        }),
    );
};

const useIsDragHandleVisible = ({
    columnIndex,
    rowIndex,
    isFocused,
}: CellIndices & { isFocused: boolean }) => {
    return usePluginsDataValueSelector(store => {
        const selection = store[CELL_SELECTION_PLUGIN_KEY];
        const dragSelection = store[DRAG_AND_EXTEND_PLUGIN_KEY];

        if (dragSelection?.end) {
            return (
                dragSelection.end.columnIndex === columnIndex &&
                dragSelection.end.rowIndex === rowIndex
            );
        }

        if (!selection || !(selection.end || selection.start)) return isFocused;

        const { start, end } = selection;

        const endRowIndex = start?.rowIndex <= end?.rowIndex ? end?.rowIndex : start?.rowIndex;
        const endColumnIndex =
            start?.columnIndex <= end?.columnIndex ? end?.columnIndex : start?.columnIndex;

        return endColumnIndex === columnIndex && endRowIndex === rowIndex;
    });
};

const useIsDragHandleVisibleRow = ({ rowIndex }: { rowIndex: number }) => {
    return usePluginsDataValueSelector(store => {
        const selection = store[CELL_SELECTION_PLUGIN_KEY];
        const dragSelection = store[DRAG_AND_EXTEND_PLUGIN_KEY];
        const focusedCell = store[CELL_FOCUS_PLUGIN_KEY]?.focusedCell;

        if (dragSelection?.end) {
            return dragSelection.end.rowIndex === rowIndex;
        }

        if (!selection || !(selection.end || selection.start))
            return focusedCell?.rowIndex === rowIndex;

        const { start, end } = selection;

        const endRowIndex = start?.rowIndex <= end?.rowIndex ? end?.rowIndex : start?.rowIndex;

        return endRowIndex === rowIndex;
    });
};

export const [useDragAndExtendPlugin, useDragAndExtendEvents, useDragAndExtendMethods] =
    createPlugin({
        key: DRAG_AND_EXTEND_PLUGIN_KEY,
        eventKeys: [
            PluginEvents.BEFORE_DRAG_AND_EXTEND,
            PluginEvents.ON_DRAG_AND_EXTEND,
            PluginEvents.AFTER_DRAG_AND_EXTEND,
        ],
        methods: {
            useOnDragSelection,
            useOnDragStart,
            useOnDragEnd,
            useHasDragAndExtendSelection,
            useIsDragHandleVisible,
            useIsDragHandleVisibleRow,
        },
    });
