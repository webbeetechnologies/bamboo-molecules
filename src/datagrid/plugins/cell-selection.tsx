import { useCallback, useEffect } from 'react';
import {
    usePluginsDataValueSelectorValue,
    useTableManagerStoreRef,
} from '@bambooapp/bamboo-molecules/datagrid';
import { Platform } from 'react-native';

import { createPlugin } from './createPlugin';
import { PluginEvents } from './types';
import { usePluginsDataStoreRef } from './plugins-manager';
import { checkSelection, useNormalizeCellHandler } from './utils';

export type CellIndexes = {
    rowIndex: number;
    columnIndex: number;
};

export const CELL_SELECTION_PLUGIN_KEY = 'cell-selection';

const useOnSelectCell = () => {
    const { store: tableManagerStore, set: setTableManagerStore } = useTableManagerStoreRef();
    const { set: setStore } = usePluginsDataStoreRef();
    const { beforeCellSelection, afterCellSelection, onCellSelection } = useCellSelectionEvents();
    const normalizeCell = useNormalizeCellHandler();

    return useCallback(
        (cell: CellIndexes) => {
            if (
                !tableManagerStore.current.focusedCell ||
                tableManagerStore.current.focusedCell?.type === 'column'
            ) {
                setTableManagerStore(() => ({
                    focusedCell: { ...normalizeCell(cell), type: 'cell' },
                }));

                return;
            }

            const selection = { start: tableManagerStore.current.focusedCell, end: cell };

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
            normalizeCell,
            afterCellSelection,
            beforeCellSelection,
            onCellSelection,
            setStore,
            setTableManagerStore,
            tableManagerStore,
        ],
    );
};

const allowedTargetIds = ['drag-handle'];

const useResetSelectionOnClickOutside = () => {
    const { set: setStore } = usePluginsDataStoreRef();

    const onMouseDown = useCallback(
        (e: MouseEvent) => {
            if (allowedTargetIds.includes((e.target as HTMLDivElement)?.id)) return;

            setStore(() => ({
                [CELL_SELECTION_PLUGIN_KEY]: {
                    start: undefined,
                    end: undefined,
                },
            }));
        },
        [setStore],
    );

    useEffect(() => {
        if (Platform.OS !== 'web') return;

        window.addEventListener('mousedown', onMouseDown);

        return () => {
            window.removeEventListener('mousedown', onMouseDown);
        };
    }, [onMouseDown]);
};

const useOnDragAndSelectStart = () => {
    const { set: setStore } = usePluginsDataStoreRef();
    const normalizeCell = useNormalizeCellHandler();

    return useCallback(
        (cellIndexes: { columnIndex: number; rowIndex: number }) => {
            setStore(prev => ({
                [CELL_SELECTION_PLUGIN_KEY]: {
                    ...prev[CELL_SELECTION_PLUGIN_KEY],
                    start: normalizeCell(cellIndexes),
                    isSelecting: true,
                },
            }));
        },
        [normalizeCell, setStore],
    );
};

const useOnDragAndSelectEnd = () => {
    const { set: setStore } = usePluginsDataStoreRef();

    return useCallback(() => {
        setStore(prev => ({
            [CELL_SELECTION_PLUGIN_KEY]: {
                ...prev[CELL_SELECTION_PLUGIN_KEY],
                isSelecting: false,
            },
        }));
    }, [setStore]);
};

const useProcessDragCellSelection = ({
    cell,
    hovered,
}: {
    cell: CellIndexes;
    hovered: boolean;
}) => {
    const { store: pluginsDataStore } = usePluginsDataStoreRef();
    const onSelectCell = useOnSelectCell();

    useEffect(() => {
        if (!pluginsDataStore.current[CELL_SELECTION_PLUGIN_KEY]?.isSelecting || !hovered) return;

        onSelectCell(cell);
    });
};

const useHasCellSelection = ({ columnIndex, rowIndex }: CellIndexes) => {
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
            useResetSelectionOnClickOutside,
            useOnDragAndSelectStart,
            useOnDragAndSelectEnd,
            useProcessDragCellSelection,
            useHasCellSelection,
        },
    });
