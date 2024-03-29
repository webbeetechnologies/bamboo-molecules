import { useCallback } from 'react';
import {
    CELL_FOCUS_PLUGIN_KEY,
    FocusedCell,
    usePluginsDataStoreRef,
} from '@bambooapp/bamboo-molecules/datagrid';

import { useNormalizeCellHandler } from '../utils';
import { useCellFocusEvents } from './cell-focus';

export const useSetFocusCellPluginStore = () => {
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
                cellFocusStore:
                    | { focusedCell: FocusedCell; isEditing?: boolean; pressedKey?: string }
                    | undefined,
            ) => Partial<
                { focusedCell: FocusedCell; isEditing?: boolean; pressedKey?: string } | undefined
            >,
        ) => {
            const focusedCell = selector(
                pluginsStoreRef.current[CELL_FOCUS_PLUGIN_KEY],
            )?.focusedCell;

            const setStore = () => {
                setPluginsStore(prev => ({
                    [CELL_FOCUS_PLUGIN_KEY]: {
                        ...prev[CELL_FOCUS_PLUGIN_KEY],
                        pressedKey: '',
                        ...selector(prev[CELL_FOCUS_PLUGIN_KEY]),
                    },
                }));
            };

            if (focusedCell === null) {
                const shouldContinue = beforeUnFocusCell({
                    cell: pluginsStoreRef.current[CELL_FOCUS_PLUGIN_KEY]?.focusedCell
                        ? normalizeCell(
                              pluginsStoreRef.current[CELL_FOCUS_PLUGIN_KEY]?.focusedCell,
                          ) ?? null
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

export const useResetFocusCellState = () => {
    const setFocusState = useSetFocusCellPluginStore();
    const { store } = usePluginsDataStoreRef();

    return useCallback(() => {
        if (!store.current[CELL_FOCUS_PLUGIN_KEY]?.focusedCell) return;

        if (store.current[CELL_FOCUS_PLUGIN_KEY].isEditing) {
            setFocusState(() => ({ isEditing: false, pressedKey: '' }));

            return;
        }

        setFocusState(() => ({
            focusedCell: null,
            focusedCellRef: null,
            isEditing: false,
            pressedKey: '',
        }));
    }, [setFocusState, store]);
};
