import { useCallback, useMemo, useRef, useState } from 'react';
import type { NativeSyntheticEvent, TextInputSelectionChangeEventData } from 'react-native';
import { Masks as defaultMasks } from 'react-native-mask-input';

export const Masks = {
    ...defaultMasks,
    // TODO add more masks
};

export { createNumberMask } from '../../utils';

const changedByOne = (reference: number, number: number) => {
    return number === reference + 1 || number === reference - 1;
};

export const useSelectionHandler = ({ initialStart = 0, initialEnd = 0 }) => {
    const [selection, setSelection] = useState({
        start: initialStart,
        end: initialEnd,
    });

    const keyRef = useRef(false);

    const onSelectionChange = useCallback(
        ({ nativeEvent }: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
            if (
                (nativeEvent as any).type === 'selectionchange' &&
                keyRef.current &&
                !changedByOne(selection.start, nativeEvent.selection.start)
            ) {
                return;
            }

            setSelection(nativeEvent.selection);
        },
        [selection],
    );

    const onKeyPress = useCallback((e: any) => {
        const { key, altKey, metaKey } = e;

        keyRef.current = (altKey || metaKey) && ['Ctrl', 'Meta', 'Alt'].includes(key);
    }, []);

    return useMemo(
        () => ({
            selection,
            setSelection,
            onSelectionChange,
            onKeyPress,
        }),
        [onKeyPress, onSelectionChange, selection],
    );
};
