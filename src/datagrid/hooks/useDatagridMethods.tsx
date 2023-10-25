import { useShortcut } from '@bambooapp/bamboo-molecules/shortcuts-manager';

import {
    CELL_FOCUS_PLUGIN_KEY,
    useCellFocusMethods,
    useCellSelectionMethods,
    usePluginsDataStoreRef,
    usePluginsDataValueSelector,
} from '../plugins';
import { useTableManagerStoreRef } from '../contexts';
import useHandleClickOutside from './useHandleClickOutside';
import useHandleKeydownEvents from './useHandleKeydownEvents';
import useToggleCellEditingState from './useToggleCellEditingState';

const useDatagridMethods = () => {
    const { store: storeRef } = useTableManagerStoreRef();
    const {
        useResetFocusCellState,
        useEnsureFocusedCellRowId,
        useEnsureCorrectFocusCellState,
        useSetFocusCellByDirection,
    } = useCellFocusMethods();
    const resetFocusCellState = useResetFocusCellState();

    const { store: pluginsStore } = usePluginsDataStoreRef();
    const { hasFocusedCell } = usePluginsDataValueSelector(store => ({
        hasFocusedCell: !!store[CELL_FOCUS_PLUGIN_KEY]?.focusedCell,
    }));

    const { useResetSelectionOnFocusCellChange, useSetSelectionByDirection } =
        useCellSelectionMethods();

    const setFocusCellByDirection = useSetFocusCellByDirection();
    const setSelectionByDirection = useSetSelectionByDirection();

    useHandleKeydownEvents({ ref: storeRef.current.tableRef });
    useHandleClickOutside();
    useEnsureCorrectFocusCellState();

    useResetSelectionOnFocusCellChange();

    useToggleCellEditingState();

    useEnsureFocusedCellRowId();

    useShortcut(
        'move-cell-focus',
        ({ key, pressedKeys, normalizedKey }) => {
            if (normalizedKey.includes('tab')) {
                setFocusCellByDirection(normalizedKey.includes('shift') ? 'left' : 'right');

                return;
            }

            if (pluginsStore.current[CELL_FOCUS_PLUGIN_KEY]?.isEditing) return;

            setFocusCellByDirection(
                key.split('Arrow')[1].toLowerCase(),
                pressedKeys.includes('meta') || pressedKeys.includes('control'),
            );
        },
        !hasFocusedCell,
    );

    useShortcut(
        'move-cell-selection',
        ({ key }) => {
            setSelectionByDirection(key.split('Arrow')[1].toLowerCase());
        },
        !hasFocusedCell,
    );

    useShortcut(
        'clear-cell-focus',
        () => {
            resetFocusCellState();
        },
        !hasFocusedCell,
    );
};

export default useDatagridMethods;
