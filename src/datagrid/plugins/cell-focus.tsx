import { useCallback, useEffect, useMemo } from 'react';
import type { TDataTableRow, TDataTableColumn } from '@bambooapp/bamboo-molecules';

import { shallowCompare } from '../../utils';
import { createPlugin } from './createPlugin';
import { FocusedCell, PluginEvents } from './types';
import { usePluginsDataStoreRef, usePluginsDataValueSelector } from './plugins-manager';
import { useNormalizeCellHandler } from './utils';
import { useDataTableStore } from '../../components/DataTable/DataTableContext/DataTableContext';

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
    const normalizeCell = useNormalizeCellHandler();

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
                    cell: pluginsStoreRef.current[CELL_FOCUS_PLUGIN_KEY]?.focusedCell
                        ? normalizeCell(pluginsStoreRef.current[CELL_FOCUS_PLUGIN_KEY]?.focusedCell)
                        : null,
                });

                if (shouldContinue === false) return;

                onUnFocusCell();

                setStore();

                afterUnFocusCell();

                return;
            }

            if (focusedCell) {
                const normalizedCell = normalizeCell({
                    ...focusedCell,
                    rowIndex: focusedCell.rowIndex || 0,
                });
                const shouldContinue = beforeFocusCell({ cell: normalizedCell });

                if (shouldContinue === false) return;

                onFocusCell({ cell: normalizedCell });

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
            normalizeCell,
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

const useEnsureCorrectFocusCellState = () => {
    const [{ recordIds, columnIds }] = useDataTableStore(state => ({
        recordIds: state.records,
        columnIds: state.columns,
    }));

    const { recordsMap, columnsMap } = useMemo(
        () => ({
            recordsMap: recordIds.reduce((acc: Record<TDataTableRow, true>, recordId) => {
                acc[recordId] = true;

                return acc;
            }, {}),
            columnsMap: columnIds.reduce((acc: Record<TDataTableColumn, true>, columnId) => {
                acc[columnId] = true;

                return acc;
            }, {}),
        }),
        [columnIds, recordIds],
    );

    const setFocusCell = useSetFocusCellPluginStore();
    const isFocusedCellStateCorrect = usePluginsDataValueSelector(state => {
        const { columnId, rowId } = state[CELL_FOCUS_PLUGIN_KEY]?.focusedCell || {};

        return columnsMap[columnId] && recordsMap[rowId];
    });

    useEffect(() => {
        if (isFocusedCellStateCorrect) return;

        setFocusCell(() => ({
            focusedCell: null,
            focusedCellRef: null,
            isEditing: false,
        }));
    }, [isFocusedCellStateCorrect, setFocusCell]);
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
    },
});
