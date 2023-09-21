import { usePluginsDataValueSelector } from '@bambooapp/bamboo-molecules/datagrid';
import { useCallback, useEffect } from 'react';

import { createPlugin } from './createPlugin';
import { usePluginsDataStoreRef } from './plugins-manager';
import { CellIndices, PluginEvents } from './types';
import { checkSelection, useNormalizeCellHandler, useNormalizeSelectionHandler } from './utils';
import { CELL_FOCUS_PLUGIN_KEY } from './cell-focus';

export const CELL_SELECTION_PLUGIN_KEY = 'cell-selection';

const useOnSelectCell = () => {
    const { store: pluginsDataStore, set: setStore } = usePluginsDataStoreRef();
    const { beforeCellSelection, afterCellSelection, onCellSelection } = useCellSelectionEvents();
    const normalizeSelection = useNormalizeSelectionHandler();

    return useCallback(
        (cell: CellIndices) => {
            const focusedCell = pluginsDataStore.current[CELL_FOCUS_PLUGIN_KEY]?.focusedCell;

            // this wouldn't be possible
            if (!focusedCell || focusedCell?.type === 'column') {
                // setTableManagerStore(() => ({
                //     focusedCell: { ...normalizeCell(cell), type: 'cell' },
                // }));

                return;
            }

            const selection = normalizeSelection({
                start: focusedCell as CellIndices,
                end: cell as CellIndices,
            });

            const continueSelection = beforeCellSelection({ selection });

            if (continueSelection === false) return;

            onCellSelection({ selection });
            setStore(prev => ({
                [CELL_SELECTION_PLUGIN_KEY]: {
                    ...prev[CELL_SELECTION_PLUGIN_KEY],
                    ...selection,
                },
            }));

            afterCellSelection();
        },
        [
            pluginsDataStore,
            normalizeSelection,
            beforeCellSelection,
            onCellSelection,
            setStore,
            afterCellSelection,
        ],
    );
};

const allowedTargetIds = ['drag-handle'];

const useOnResetSelectionOnClickOutside = () => {
    const { set: setStore, store } = usePluginsDataStoreRef();

    return useCallback(
        (e: MouseEvent) => {
            if (!store.current[CELL_SELECTION_PLUGIN_KEY]) return;
            if (allowedTargetIds.includes((e.target as HTMLDivElement)?.id)) return;

            setStore(() => ({
                [CELL_SELECTION_PLUGIN_KEY]: undefined,
            }));
        },
        [setStore, store],
    );
};

const useResetSelectionOnFocusCellChange = () => {
    const { set: setStore, store } = usePluginsDataStoreRef();
    const { columnId, rowId } = usePluginsDataValueSelector(store => ({
        columnId: store[CELL_FOCUS_PLUGIN_KEY]?.focusedCell?.columnId,
        rowId: store[CELL_FOCUS_PLUGIN_KEY]?.focusedCell?.rowId,
    }));

    useEffect(() => {
        if (
            !store.current[CELL_SELECTION_PLUGIN_KEY] ||
            store.current[CELL_SELECTION_PLUGIN_KEY]?.isSelecting
        )
            return;

        setStore(() => ({
            [CELL_SELECTION_PLUGIN_KEY]: undefined,
        }));
    }, [columnId, rowId, setStore, store]);
};

const useOnDragAndSelectStart = () => {
    const { set: setStore } = usePluginsDataStoreRef();
    const normalizeCell = useNormalizeCellHandler();

    return useCallback(
        (cell: { columnIndex: number; rowIndex: number }) => {
            setStore(prev => ({
                [CELL_SELECTION_PLUGIN_KEY]: {
                    ...prev[CELL_SELECTION_PLUGIN_KEY],
                    start: normalizeCell(cell),
                    isSelecting: true,
                },
            }));
        },
        [normalizeCell, setStore],
    );
};

const useOnDragAndSelectEnd = () => {
    const { store, set: setStore } = usePluginsDataStoreRef();
    const { beforeCellSelection, onCellSelection, afterCellSelection } = useCellSelectionEvents();

    const normalizeSelection = useNormalizeSelectionHandler();

    return useCallback(() => {
        if (!store.current[CELL_SELECTION_PLUGIN_KEY]) return;

        const selection = normalizeSelection(store.current[CELL_SELECTION_PLUGIN_KEY]);

        if (beforeCellSelection({ selection }) === false) return;

        onCellSelection({ selection });

        setStore(prev => ({
            [CELL_SELECTION_PLUGIN_KEY]: {
                ...prev[CELL_SELECTION_PLUGIN_KEY],
                isSelecting: false,
            },
        }));

        afterCellSelection();
    }, [
        afterCellSelection,
        beforeCellSelection,
        onCellSelection,
        setStore,
        store,
        normalizeSelection,
    ]);
};

const useProcessDragCellSelection = ({
    cell,
    hovered,
}: {
    cell: CellIndices;
    hovered: boolean;
}) => {
    const { store: pluginsDataStore } = usePluginsDataStoreRef();
    const onSelectCell = useOnSelectCell();

    useEffect(() => {
        if (!pluginsDataStore.current[CELL_SELECTION_PLUGIN_KEY]?.isSelecting || !hovered) return;

        onSelectCell(cell);
    });
};

const useHasCellSelection = ({ columnIndex, rowIndex }: CellIndices) => {
    return usePluginsDataValueSelector(store =>
        checkSelection(store[CELL_SELECTION_PLUGIN_KEY], {
            columnIndex,
            rowIndex,
        }),
    );
};

export const [useCellSelectionPlugin, useCellSelectionEvents, useCellSelectionMethods] =
    createPlugin({
        key: CELL_SELECTION_PLUGIN_KEY,
        eventKeys: [
            PluginEvents.BEFORE_CELL_SELECTION,
            PluginEvents.ON_CELL_SELECTION,
            PluginEvents.AFTER_CELL_SELECTION,
        ],
        methods: {
            useOnSelectCell,
            useOnResetSelectionOnClickOutside,
            useResetSelectionOnFocusCellChange,
            useOnDragAndSelectStart,
            useOnDragAndSelectEnd,
            useProcessDragCellSelection,
            useHasCellSelection,
        },
    });
