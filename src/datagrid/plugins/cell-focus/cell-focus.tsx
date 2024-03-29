import { TDataTableRow, TDataTableColumn, useLatest } from '@bambooapp/bamboo-molecules';

import { isNil, shallowCompare } from '../../../utils';
import { createPlugin } from '../createPlugin';
import { PluginEvents } from '../types';
import { usePluginsDataStoreRef, usePluginsDataValueSelector } from '../plugins-manager';
import { useResetFocusCellState, useSetFocusCellPluginStore } from './useSetFocusCellPluginStore';
import { useSetFocusCellByDirection } from './useSetFocusCellByDirection';
import { useEnsureCorrectFocusCellState } from './useEnsureFocusCellState';

import { useEffect } from 'react';
import { useTableManagerStoreRef } from '../../contexts';
import { GroupFooter, GroupRecord, getRecordByIndex } from '../../utils';

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

export const useEnsureFocusedCellRowId = () => {
    const tableManagerStoreRef = useTableManagerStoreRef().store;
    const setFocusedCell = useSetFocusCellPluginStore();
    const recordRef = useLatest(
        usePluginsDataValueSelector(store => {
            const focusedCell = store[CELL_FOCUS_PLUGIN_KEY]?.focusedCell ?? {};
            const groupRecord = getRecordByIndex(
                tableManagerStoreRef.current.records,
                focusedCell?.rowIndex ?? -1,
            ) as GroupRecord | GroupFooter;
            return {
                record: groupRecord,
                groupIndex: groupRecord.groupIndex,
                rowId: focusedCell?.rowId,
                hasFocusedCell: Object.keys(focusedCell ?? {}).length > 0,
            };
        }, shallowCompare),
    );

    const row = tableManagerStoreRef.current.useGetRowId(
        recordRef.current.record,
        recordRef.current.rowId,
    );

    useEffect(() => {
        if (!recordRef.current.hasFocusedCell || isNil(row)) return;

        const newIndex =
            row.indexInGroup > -1 ? recordRef.current.groupIndex + row.indexInGroup : null;
        if (recordRef.current.rowId === row.id && newIndex === recordRef.current.record.index)
            return;

        setFocusedCell(prev =>
            !prev?.focusedCell
                ? prev
                : {
                      ...prev,
                      focusedCell:
                          !row.id || newIndex === null
                              ? undefined
                              : {
                                    ...prev.focusedCell,
                                    rowIndex: newIndex,
                                },
                  },
        );
    }, [row, recordRef, setFocusedCell]);
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
        useEnsureFocusedCellRowId,
    },
});
