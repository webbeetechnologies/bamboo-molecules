import { useCallback, useEffect } from 'react';
import { Platform } from 'react-native';
import { useCellFocusMethods, useCellSelectionMethods } from '../plugins';

const useHandleClickOutside = () => {
    const { useSetFocusCellPluginStore } = useCellFocusMethods();
    const { useOnResetSelectionOnClickOutside } = useCellSelectionMethods();

    const setFocusCellPluginStore = useSetFocusCellPluginStore();
    const onResetSelection = useOnResetSelectionOnClickOutside();

    const onResetFocus = useCallback(
        (e: MouseEvent) => {
            // dataset comes from the cell-renderer // if this datatype is a parent, we don't want to rest
            if (
                ((e.target as HTMLDivElement).closest('[data-elementtype]') as HTMLDivElement)
                    ?.dataset?.elementtype
            )
                return;

            setFocusCellPluginStore(() => ({
                focusedCell: null,
                focusedCellRef: null,
                isEditing: false,
            }));
        },
        [setFocusCellPluginStore],
    );

    const onMouseDown = useCallback(
        (e: MouseEvent) => {
            onResetSelection(e);
            onResetFocus(e);
        },
        [onResetFocus, onResetSelection],
    );

    useEffect(() => {
        if (Platform.OS !== 'web') return;

        window.addEventListener('mousedown', onMouseDown);

        return () => {
            window.removeEventListener('mousedown', onMouseDown);
        };
    }, [onMouseDown]);
};

export default useHandleClickOutside;
