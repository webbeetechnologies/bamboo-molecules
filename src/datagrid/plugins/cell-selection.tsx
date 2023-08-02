import { createPlugin } from './createPlugin';
import { PluginEvents } from './types';
import { usePluginsDataStoreRef } from './plugins-manager';
import { useCallback, useEffect } from 'react';
import { useTableManagerStoreRef } from '@bambooapp/bamboo-molecules/datagrid';
import type { TDataTableColumn, TDataTableRow } from '@bambooapp/bamboo-molecules/components';
import { Platform } from 'react-native';

export type Cell = {
    columnId: TDataTableColumn;
    rowId: TDataTableRow;
    rowIndex: number;
    columnIndex: number;
};

export const cellSelectionPluginKey = 'cell-selection';

const useOnSelectCell = () => {
    const { store: tableManagerStore, set: setTableManagerStore } = useTableManagerStoreRef();
    const { set: setStore } = usePluginsDataStoreRef();
    const { beforeCellSelection, afterCellSelection, onCellSelection } = useSelectionEvents();

    return useCallback(
        (cell: Cell) => {
            if (
                !tableManagerStore.current.focusedCell ||
                tableManagerStore.current.focusedCell?.type === 'column'
            ) {
                setTableManagerStore(() => ({
                    focusedCell: { ...cell, type: 'cell' },
                }));

                return;
            }

            const selection = { start: tableManagerStore.current.focusedCell, end: cell };

            const continueSelection = beforeCellSelection({ selection });

            if (continueSelection === false) return;

            onCellSelection({ selection });
            setStore(prev => ({
                [cellSelectionPluginKey]: {
                    ...prev[cellSelectionPluginKey],
                    ...selection,
                },
            }));

            afterCellSelection();
        },
        [
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
                [cellSelectionPluginKey]: {
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

export const [useSelectionPlugin, useSelectionEvents, useSelectionMethods] = createPlugin({
    key: cellSelectionPluginKey,
    eventKeys: [
        PluginEvents.BEFORE_CELL_SELECTION,
        PluginEvents.ON_CELL_SELECTION,
        PluginEvents.AFTER_CELL_SELECTION,
    ],
    methods: { useOnSelectCell, useResetSelectionOnClickOutside },
});
