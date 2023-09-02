import { useCallback, useEffect } from 'react';
import { Platform } from 'react-native';
import { useCellSelectionMethods } from '../plugins';
import { useTableManagerStoreRef } from '@bambooapp/bamboo-molecules/datagrid';

const useHandleClickOutside = () => {
    const { set: setTableManagerStore } = useTableManagerStoreRef();
    const { useOnResetSelectionOnClickOutside } = useCellSelectionMethods();
    const onResetSelection = useOnResetSelectionOnClickOutside();

    const onResetFocus = useCallback(
        (e: MouseEvent) => {
            // dataset comes from the cell-renderer // if this datatype is a parent, we don't want to rest
            if (
                ((e.target as HTMLDivElement).closest('[data-elementtype]') as HTMLDivElement)
                    ?.dataset?.elementtype
            )
                return;

            setTableManagerStore(() => ({
                focusedCell: null,
                focusedCellRef: null,
                isEditing: false,
            }));
        },
        [setTableManagerStore],
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
