import { useCallback, useEffect } from 'react';
import { useDataTableStoreRef } from '@bambooapp/bamboo-molecules/components';

import { useTableManagerStoreRef } from '../contexts';
import { CELL_SELECTION_PLUGIN_KEY, CellIndexes } from './cell-selection';
import { usePluginsDataStoreRef, usePluginsDataValueSelectorValue } from './plugins-manager';
import { createPlugin } from './createPlugin';
import { PluginEvents, SelectionIndexes } from './types';
import { checkSelection, useNormalizeCellHandler, useNormalizeSelectionHandler } from './utils';

export const DRAG_AND_EXTEND_PLUGIN_KEY = 'drag-and-extend';

const emptyObj = {};

const checkIfWithinRow = (selection: SelectionIndexes, cell: { rowIndex: number }) => {
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
    const { store: tableManagerStore } = useTableManagerStoreRef();
    const { store, set: setStore } = usePluginsDataStoreRef();
    const { onDragAndExtend, afterDragAndExtend } = useDragAndExtendEvents() || emptyObj;
    const normalizeSelection = useNormalizeSelectionHandler();

    return useCallback(() => {
        const copySelection = store.current[CELL_SELECTION_PLUGIN_KEY] || {
            start: tableManagerStore.current.focusedCell,
            end: tableManagerStore.current.focusedCell,
        };
        const pasteSelection = store.current[DRAG_AND_EXTEND_PLUGIN_KEY];

        onDragAndExtend({
            selection: normalizeSelection(copySelection),
            target: normalizeSelection(pasteSelection),
        });

        setStore(prev => ({
            [DRAG_AND_EXTEND_PLUGIN_KEY]: undefined,
            // clearing cell selection as well
            [CELL_SELECTION_PLUGIN_KEY]: {
                ...prev[CELL_SELECTION_PLUGIN_KEY],
                start:
                    prev[CELL_SELECTION_PLUGIN_KEY]?.start || tableManagerStore.current.focusedCell,
                end: prev[DRAG_AND_EXTEND_PLUGIN_KEY]?.end,
            },
        }));

        afterDragAndExtend();
    }, [
        afterDragAndExtend,
        normalizeSelection,
        onDragAndExtend,
        setStore,
        store,
        tableManagerStore,
    ]);
};

const useOnDragSelection = ({
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
    const { store: datatableStore } = useDataTableStoreRef();
    const { store: tableManagerStore } = useTableManagerStoreRef();
    const { store: pluginsDataStore, set: setPluginsDataStore } = usePluginsDataStoreRef();
    const { beforeDragAndExtend, onDragAndExtend } = useDragAndExtendEvents();

    const normalizeCell = useNormalizeCellHandler();
    const normalizeSelection = useNormalizeSelectionHandler();

    useEffect(() => {
        // we need hovered because only hovered cell would trigger the event instead of the entire row
        if (!pluginsDataStore.current[DRAG_AND_EXTEND_PLUGIN_KEY]?.start || !rowHovered || !hovered)
            return;

        const hasSelection =
            pluginsDataStore.current[CELL_SELECTION_PLUGIN_KEY]?.start &&
            pluginsDataStore.current[CELL_SELECTION_PLUGIN_KEY]?.end;
        // if there is no selection, we use focusedCell
        const cellsSelection = hasSelection
            ? pluginsDataStore.current[CELL_SELECTION_PLUGIN_KEY]
            : {
                  start: tableManagerStore.current.focusedCell,
                  end: tableManagerStore.current.focusedCell,
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
            const startColumnIndexOffset = columnIndex > cellsSelection.end.columnIndex ? 1 : -1;
            const startColumnIndex = cellsSelection.end.columnIndex + startColumnIndexOffset;
            const startRowIndex = cellsSelection.start.rowIndex;
            const endRowIndex = cellsSelection.end.rowIndex;

            selection = {
                start: normalizeCell({
                    columnIndex: startColumnIndex,
                    rowIndex: startRowIndex,
                }),
                end: normalizeCell({
                    columnIndex,
                    rowIndex: endRowIndex,
                }),
            };
        }

        // This means it's vertical selection
        if (rowHovered && !checkIfWithinRow(cellsSelection, { rowIndex })) {
            const startRowIndexOffset = rowIndex > cellsSelection.end.rowIndex ? 1 : -1;
            const startColumnIndex = cellsSelection.start.columnIndex;
            const startRowIndex = cellsSelection.end.rowIndex + startRowIndexOffset;

            const endColumnIndex = cellsSelection.end.columnIndex;

            selection = {
                start: normalizeCell({
                    columnIndex: startColumnIndex,
                    rowIndex: startRowIndex,
                }),
                end: normalizeCell({
                    columnIndex: endColumnIndex,
                    rowIndex,
                }),
            };
        }

        selection = normalizeSelection(selection as SelectionIndexes);

        const continueDragAndSelection = beforeDragAndExtend({ selection });

        if (continueDragAndSelection === false) return;

        setPluginsDataStore(prev => ({
            [DRAG_AND_EXTEND_PLUGIN_KEY]: {
                ...prev[DRAG_AND_EXTEND_PLUGIN_KEY],
                ...selection,
            },
        }));
    }, [
        normalizeCell,
        rowHovered,
        hovered,
        rowIndex,
        setPluginsDataStore,
        columnIndex,
        pluginsDataStore,
        tableManagerStore,
        beforeDragAndExtend,
        onDragAndExtend,
        datatableStore,
        normalizeSelection,
    ]);
};

const useHasDragAndExtendSelection = ({ columnIndex, rowIndex }: CellIndexes) => {
    return usePluginsDataValueSelectorValue(store =>
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
}: CellIndexes & { isFocused: boolean }) => {
    return usePluginsDataValueSelectorValue(store => {
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
        },
    });
