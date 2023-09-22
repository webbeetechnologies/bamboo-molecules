import { useCallback, useEffect } from 'react';
import { Platform } from 'react-native';
import { useCellFocusMethods, useCellSelectionMethods } from '../plugins';

const useHandleClickOutside = () => {
    const { useResetFocusCellState } = useCellFocusMethods();
    const { useOnResetSelectionOnClickOutside } = useCellSelectionMethods();

    const resetFocusCellState = useResetFocusCellState();
    const onResetSelection = useOnResetSelectionOnClickOutside();

    const onMouseDown = useCallback(
        (e: MouseEvent) => {
            if (
                ((e.target as HTMLDivElement).closest('[data-elementtype]') as HTMLDivElement)
                    ?.dataset?.elementtype
            )
                return;

            onResetSelection(e);
            resetFocusCellState();
        },
        [onResetSelection, resetFocusCellState],
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
