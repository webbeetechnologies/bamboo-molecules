import {
    usePluginsDataValueSelectorValue,
    useTableManagerStoreRef,
} from '@bambooapp/bamboo-molecules/datagrid';
import { useCallback, useEffect } from 'react';

import { createPlugin } from './createPlugin';
import { usePluginsDataStoreRef } from './plugins-manager';
import { CellIndices, PluginEvents } from './types';
import { checkSelection, useNormalizeCellHandler, useNormalizeSelectionHandler } from './utils';

export const CELL_SELECTION_PLUGIN_KEY = 'cell-selection';

const useOnSelectCell = () => {
    const { store: tableManagerStore } = useTableManagerStoreRef();
    const { set: setStore } = usePluginsDataStoreRef();
    const { beforeCellSelection, afterCellSelection, onCellSelection } = useCellSelectionEvents();
    const normalizeSelection = useNormalizeSelectionHandler();

    return useCallback(
        (cell: CellIndices) => {
            // this wouldn't be possible
            if (
                !tableManagerStore.current.focusedCell ||
                tableManagerStore.current.focusedCell?.type === 'column'
            ) {
                // setTableManagerStore(() => ({
                //     focusedCell: { ...normalizeCell(cell), type: 'cell' },
                // }));

                return;
            }

            const selection = {
                start: tableManagerStore.current.focusedCell as CellIndices,
                end: cell as CellIndices,
            };

            const continueSelection = beforeCellSelection({ selection });

            if (continueSelection === false) return;

            onCellSelection({ selection });
            setStore(prev => ({
                [CELL_SELECTION_PLUGIN_KEY]: {
                    ...prev[CELL_SELECTION_PLUGIN_KEY],
                    ...normalizeSelection(selection),
                },
            }));

            afterCellSelection();
        },
        [
            normalizeSelection,
            afterCellSelection,
            beforeCellSelection,
            onCellSelection,
            setStore,
            tableManagerStore,
        ],
    );
};

const allowedTargetIds = ['drag-handle'];

const useOnResetSelectionOnClickOutside = () => {
    const { set: setStore } = usePluginsDataStoreRef();

    return useCallback(
        (e: MouseEvent) => {
            if (allowedTargetIds.includes((e.target as HTMLDivElement)?.id)) return;

            setStore(() => ({
                [CELL_SELECTION_PLUGIN_KEY]: undefined,
            }));
        },
        [setStore],
    );
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
    return usePluginsDataValueSelectorValue(store =>
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
            useOnDragAndSelectStart,
            useOnDragAndSelectEnd,
            useProcessDragCellSelection,
            useHasCellSelection,
        },
    });
