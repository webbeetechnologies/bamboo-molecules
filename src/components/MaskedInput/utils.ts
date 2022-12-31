import { useCallback, useMemo, useRef, useState } from 'react';
import type { NativeSyntheticEvent, TextInputSelectionChangeEventData } from 'react-native';
import {
    Masks as defaultMasks,
    useMaskedInputProps as useMaskedInputPropsDefault,
} from 'react-native-mask-input';

import { useControlledValue } from '../../hooks';
import type { MaskedInputProps } from './types';

export const Masks = {
    ...defaultMasks,
    // TODO add more masks
};

export { createNumberMask } from 'react-native-mask-input';

type Props = Pick<
    MaskedInputProps,
    | 'mask'
    | 'value'
    | 'onChangeText'
    | 'defaultValue'
    | 'obfuscationCharacter'
    | 'showObfuscatedValue'
    | 'placeholderFillCharacter'
> & { onChangeTextCallback?: (masked: string, unmasked: string, obfuscated: string) => void };

export const useMaskedInputProps = ({
    mask,
    value: valueProp,
    onChangeText: onChangeTextProp,
    defaultValue,
    obfuscationCharacter,
    showObfuscatedValue,
    placeholderFillCharacter,
    onChangeTextCallback,
}: Props) => {
    const [value, onValueChange] = useControlledValue({
        value: valueProp,
        onChange: onChangeTextProp,
        defaultValue,
    });

    const onChangeText = useCallback(
        (masked: string, unmasked: string, obfuscated: string) => {
            onValueChange(masked, unmasked, obfuscated);

            onChangeTextCallback?.(masked, unmasked, obfuscated);
        },
        [onChangeTextCallback, onValueChange],
    );

    return useMaskedInputPropsDefault({
        mask,
        obfuscationCharacter,
        value,
        onChangeText,
        showObfuscatedValue,
        placeholderFillCharacter,
    });
};

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
                setSelection(selection);
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
