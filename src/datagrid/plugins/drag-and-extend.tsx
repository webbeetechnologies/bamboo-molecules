import { useCallback, useEffect } from 'react';

import { useTableManagerStoreRef } from '../contexts';
import { cellSelectionPluginKey } from './cell-selection';
import { usePluginsDataStoreRef } from './plugins-manager';
import { createPlugin } from './createPlugin';
import { PluginEvents, Selection } from './types';
import { useCopyPasteEvents } from './ copy-paste';
import { useDataTableStoreRef } from '@bambooapp/bamboo-molecules/components';

export const dragAndExtendKey = 'drag-and-extend';

const emptyObj = {};

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
    const { store: tableManagerStore } = useTableManagerStoreRef();
    const { store, set: setStore } = usePluginsDataStoreRef();
    const {
        beforeCopyCell,
        onCopyCell,
        afterCopyCell,
        beforePasteCell,
        onPasteCell,
        afterPasteCell,
    } = useCopyPasteEvents() || emptyObj;
    const { afterDragAndExtend } = useDragAndExtendEvents() || emptyObj;

    return useCallback(() => {
        const copySelection = store.current[cellSelectionPluginKey] || {
            start: tableManagerStore.current.focusedCell,
            end: tableManagerStore.current.focusedCell,
        };
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
                isSelecting: false,
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
        tableManagerStore,
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
    const { store: datatableStore } = useDataTableStoreRef();
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
            const startColumnIndex = cellsSelection.end.columnIndex + startColumnIndexOffset;
            const startRowIndex = cellsSelection.start.rowIndex;
            const endRowIndex = cellsSelection.end.rowIndex;

            selection = {
                start: {
                    columnIndex: startColumnIndex,
                    rowIndex: startRowIndex,
                    rowId: datatableStore.current.records[startRowIndex],
                    columnId: datatableStore.current.columns[startColumnIndex],
                },
                end: {
                    rowIndex: endRowIndex,
                    rowId: datatableStore.current.records[endRowIndex],
                    columnIndex,
                    columnId: datatableStore.current.columns[columnIndex],
                },
            };
        }

        // This means it's vertical selection
        if (rowHovered && !checkIfWithinRow(cellsSelection, { rowIndex })) {
            const startRowIndexOffset = rowIndex > cellsSelection.end.rowIndex ? 1 : -1;
            const startColumnIndex = cellsSelection.start.columnIndex;
            const startRowIndex = cellsSelection.end.rowIndex + startRowIndexOffset;

            const endColumnIndex = cellsSelection.end.columnIndex;

            selection = {
                start: {
                    columnIndex: startColumnIndex,
                    columnId: datatableStore.current.columns[startColumnIndex],
                    rowIndex: startRowIndex,
                    rowId: datatableStore.current.records[startRowIndex],
                },
                end: {
                    columnIndex: endColumnIndex,
                    columnId: datatableStore.current.columns[endColumnIndex],
                    rowIndex,
                    rowId: datatableStore.current.records[rowIndex],
                },
            };
        }

        const continueDragAndSelection = beforeDragAndExtend({ selection });

        if (continueDragAndSelection === false) return;

        setPluginsDataStore(prev => ({
            [dragAndExtendKey]: {
                ...prev[dragAndExtendKey],
                ...selection,
            },
        }));

        onDragAndExtend({ selection });
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
        datatableStore,
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
