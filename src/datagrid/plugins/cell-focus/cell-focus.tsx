import type { TDataTableRow, TDataTableColumn } from '@bambooapp/bamboo-molecules';

import { shallowCompare } from '../../../utils';
import { createPlugin } from '../createPlugin';
import { PluginEvents } from '../types';
import { usePluginsDataStoreRef, usePluginsDataValueSelector } from '../plugins-manager';
import { useResetFocusCellState, useSetFocusCellPluginStore } from './useSetFocusCellPluginStore';
import { useSetFocusCellByDirection } from './useSetFocusCellByDirection';
import { useEnsureCorrectFocusCellState } from './useEnsureFocusCellState';

export const CELL_FOCUS_PLUGIN_KEY = 'cell-focus';

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

const usePressedKeyRef = () => {
    const { store } = usePluginsDataStoreRef();

    return store.current[CELL_FOCUS_PLUGIN_KEY]?.pressedKey;
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
        usePressedKeyRef,
    },
});
