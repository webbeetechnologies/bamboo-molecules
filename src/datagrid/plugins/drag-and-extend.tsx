import { useCallback, useEffect } from 'react';

import { useTableManagerStoreRef } from '../contexts';
import { cellSelectionPluginKey } from './cell-selection';
import { usePluginsDataStoreRef } from './plugins-manager';
import { createPlugin } from './createPlugin';
import { PluginEvents, Selection } from './types';
import { copyPastePluginKey, useCopyPasteEvents } from './ copy-paste';

export const dragAndExtendKey = 'drag-and-extend';

const checkIfWithinRow = (selection: Selection, cell: { rowIndex: number }) => {
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
            [dragAndExtendKey]: {
                ...prev[dragAndExtendKey],
                start: {},
            },
        }));
    }, [setStore]);
};

const useOnDragEnd = () => {
    const { store, set: setStore } = usePluginsDataStoreRef();
    const {
        beforeCopyCell,
        onCopyCell,
        afterCopyCell,
        beforePasteCell,
        onPasteCell,
        afterPasteCell,
    } = useCopyPasteEvents() || {};
    const { afterDragAndExtend } = useDragAndExtendEvents() || {};

    return useCallback(() => {
        const copySelection = store.current[copyPastePluginKey];
        const pasteSelection = store.current[dragAndExtendKey];

        const continueCopy = beforeCopyCell({ selection: copySelection });

        if (continueCopy !== false) {
            onCopyCell({ selection: copySelection });

            afterCopyCell();
        }

        const continuePaste = beforePasteCell({ selection: copySelection });

        if (continuePaste !== false) {
            onPasteCell({ selection: pasteSelection });

            afterPasteCell();
        }

        setStore(prev => ({
            [dragAndExtendKey]: {
                ...prev[dragAndExtendKey],
                start: undefined,
                end: undefined,
            },
            // clearing cell selection as well
            [cellSelectionPluginKey]: {
                ...prev[cellSelectionPluginKey],
                start: undefined,
                end: undefined,
            },
        }));

        afterDragAndExtend();
    }, [
        afterCopyCell,
        afterDragAndExtend,
        afterPasteCell,
        beforeCopyCell,
        beforePasteCell,
        onCopyCell,
        onPasteCell,
        setStore,
        store,
    ]);
};

const useOnDragSelection = ({
    checkSelection,
    columnIndex,
    rowIndex,
    hovered,
    rowHovered,
}: {
    columnIndex: number;
    rowIndex: number;
    hovered: boolean;
    rowHovered: boolean;
    checkSelection: (
        selection: Selection,
        cell: { columnIndex: number; rowIndex: number },
    ) => boolean;
}) => {
    const { store: tableManagerStore } = useTableManagerStoreRef();
    const { store: pluginsDataStore, set: setPluginsDataStore } = usePluginsDataStoreRef();
    const { beforeDragAndExtend, onDragAndExtend } = useDragAndExtendEvents();

    useEffect(() => {
        // we need hovered because only hovered cell would trigger the event instead of the entire row
        if (!pluginsDataStore.current[dragAndExtendKey]?.start || !rowHovered || !hovered) return;

        // if there is no selection, we use focusedCell
        const cellsSelection = pluginsDataStore.current[cellSelectionPluginKey]?.start
            ? pluginsDataStore.current[cellSelectionPluginKey]
            : {
                  start: tableManagerStore.current.focusedCell,
                  end: tableManagerStore.current.focusedCell,
              };

        if (checkSelection(cellsSelection, { columnIndex, rowIndex })) {
            setPluginsDataStore(prev => ({
                [dragAndExtendKey]: {
                    ...prev[dragAndExtendKey],
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

            selection = {
                start: {
                    columnIndex: cellsSelection.end.columnIndex + startColumnIndexOffset,
                    rowIndex: cellsSelection.start.rowIndex,
                },
                end: {
                    rowIndex: cellsSelection.end.rowIndex,
                    columnIndex,
                },
            };
        }

        // This means it's vertical selection
        if (rowHovered && !checkIfWithinRow(cellsSelection, { rowIndex })) {
            const startRowIndexOffset = rowIndex > cellsSelection.end.rowIndex ? 1 : -1;
            selection = {
                start: {
                    columnIndex: cellsSelection.start.columnIndex,
                    rowIndex: cellsSelection.end.rowIndex + startRowIndexOffset,
                },
                end: {
                    columnIndex: cellsSelection.end.columnIndex,
                    rowIndex,
                },
            };
        }

        const continueDragAndSelection = beforeDragAndExtend(selection);

        if (continueDragAndSelection === false) return;

        setPluginsDataStore(prev => ({
            [dragAndExtendKey]: {
                ...prev[dragAndExtendKey],
                ...selection,
            },
        }));

        onDragAndExtend(selection);
    }, [
        rowHovered,
        hovered,
        rowIndex,
        setPluginsDataStore,
        columnIndex,
        pluginsDataStore,
        tableManagerStore,
        checkSelection,
        beforeDragAndExtend,
        onDragAndExtend,
    ]);
};

export const [useDragAndExtendPlugin, useDragAndExtendEvents, useDragAndExtendMethods] =
    createPlugin({
        key: dragAndExtendKey,
        eventKeys: [
            PluginEvents.BEFORE_DRAG_AND_EXTEND,
            PluginEvents.ON_DRAG_AND_EXTEND,
            PluginEvents.AFTER_DRAG_AND_EXTEND,
        ],
        methods: { useOnDragSelection, useOnDragStart, useOnDragEnd },
    });
