import { useHandleClickOutside, useHandleKeydownEvents } from './index';
import { useShortcut } from '@bambooapp/bamboo-molecules/shortcuts-manager';
import {
    CELL_FOCUS_PLUGIN_KEY,
    useCellFocusMethods,
    usePluginsDataValueSelector,
} from '../plugins';
import { useTableManagerStoreRef } from '../contexts';

const useDatagridMethods = () => {
    const { store: storeRef } = useTableManagerStoreRef();
    const { useResetFocusCellState } = useCellFocusMethods();
    const resetFocusCellState = useResetFocusCellState();

    const { hasFocusedCell } = usePluginsDataValueSelector(store => ({
        hasFocusedCell: store[CELL_FOCUS_PLUGIN_KEY]?.focusedCell,
    }));

    const { useEnsureCorrectFocusCellState, useSetFocusCellByDirection } = useCellFocusMethods();
    const setFocusCellByDirection = useSetFocusCellByDirection();

    useHandleKeydownEvents({ ref: storeRef.current.tableRef });
    useHandleClickOutside();
    useEnsureCorrectFocusCellState();

    useShortcut(
        'move-cell-focus',
        ({ key, pressedKeys, normalizedKey }) => {
            if (normalizedKey.includes('tab')) {
                setFocusCellByDirection(normalizedKey.includes('shift') ? 'left' : 'right');

                return;
            }

            setFocusCellByDirection(
                key.split('Arrow')[1].toLowerCase(),
                pressedKeys.includes('meta') || pressedKeys.includes('control'),
            );
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
