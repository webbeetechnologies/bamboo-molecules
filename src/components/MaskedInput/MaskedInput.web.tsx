import { forwardRef, memo, useCallback, useRef, useState } from 'react';
import type { NativeSyntheticEvent, TextInputSelectionChangeEventData } from 'react-native';
import { useMaskedInputProps } from 'react-native-mask-input';

import { useControlledValue, useMolecules } from '../../hooks';
import type { MaskedInputProps } from './types';

const changedByOne = (reference: number, number: number) => {
    return number === reference + 1 || number === reference - 1;
};

const MaskedInputBase = (
    {
        mask,
        obfuscationCharacter,
        value: valueProp,
        defaultValue = '',
        onChangeText: onChangeTextProp,
        showObfuscatedValue,
        placeholderFillCharacter,
        ...rest
    }: MaskedInputProps,
    ref: any,
) => {
    const { TextInput } = useMolecules();

    const [value, onValueChange] = useControlledValue({
        value: valueProp,
        onChange: onChangeTextProp,
        defaultValue,
    });

    const [selection, setSelection] = useState({
        start: value.length,
        end: value.length,
    });

    const onChangeText = useCallback(
        (masked: string, unmasked: string, obfuscated: string) => {
            onValueChange(masked, unmasked, obfuscated);

            const delta = masked.length - previousMaskedValue.current.length;

            previousMaskedValue.current = masked;

            setSelection({
                start: selection.start + delta,
                end: selection.end + delta,
            });
        },
        [onValueChange, selection],
    );

    const maskedProps = useMaskedInputProps({
        mask,
        obfuscationCharacter,
        value: value,
        onChangeText,
        showObfuscatedValue,
        placeholderFillCharacter,
    });

    const keyRef = useRef(false);
    const previousMaskedValue = useRef(maskedProps.value);

    const onSelectionChange = useCallback(
        ({ nativeEvent }: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => {
            if (
                (nativeEvent as any).type === 'selectionchange' &&
                keyRef.current &&
                !changedByOne(selection.start, nativeEvent.selection.start)
            ) {
                setSelection({
                    ...selection,
                });
                return;
            }

            setSelection({ ...nativeEvent.selection });
        },
        [selection],
    );

    const onKeyPress = useCallback((e: any) => {
        const { key, altKey, metaKey } = e;

        keyRef.current = (altKey || metaKey) && ['Ctrl', 'Meta', 'Alt'].includes(key);
    }, []);

    return (
        <TextInput
            {...rest}
            {...maskedProps}
            selection={selection}
            onSelectionChange={onSelectionChange}
            onKeyPress={onKeyPress}
            ref={ref}
        />
    );
};

export default memo(forwardRef(MaskedInputBase));
