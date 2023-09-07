import { useCallback } from 'react';
import type { TDataTableRow, TDataTableColumn } from '@bambooapp/bamboo-molecules';

import { shallowCompare } from '../../utils';
import { createPlugin } from './createPlugin';
import { FocusedCell, PluginEvents } from './types';
import { usePluginsDataStoreRef, usePluginsDataValueSelector } from './plugins-manager';

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
                    cell: pluginsStoreRef.current[CELL_FOCUS_PLUGIN_KEY]?.focusedCell,
                });

                if (shouldContinue === false) return;

                onUnFocusCell();

                setStore();

                afterUnFocusCell();

                return;
            }

            if (focusedCell) {
                const shouldContinue = beforeFocusCell({ cell: focusedCell });

                if (shouldContinue === false) return;

                onFocusCell({ cell: focusedCell });

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
            onFocusCell,
            onUnFocusCell,
            pluginsStoreRef,
            setPluginsStore,
        ],
    );
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
    },
});
