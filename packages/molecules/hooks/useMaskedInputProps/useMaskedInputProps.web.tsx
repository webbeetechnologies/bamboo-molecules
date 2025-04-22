import { useCallback, useMemo, useRef } from 'react';
import { useMaskedInputPropsInternal } from './useMaskedInputInternal';
import { useSelectionHandler } from '../../components/MaskedInput/utils';
import type { UseMaskedInputProps } from './types';

const useMaskedInputProps = ({
    mask,
    obfuscationCharacter,
    showObfuscatedValue,
    placeholderFillCharacter,
    value: valueProp,
    onChangeText: onChangeTextProp,
}: UseMaskedInputProps) => {
    const { selection, setSelection, onSelectionChange, onKeyPress } = useSelectionHandler({
        initialStart: valueProp.length || 0,
        initialEnd: valueProp.length || 0,
    });

    const onChangeText = useCallback(
        (masked: string, unmasked: string, obfuscated: string) => {
            onChangeTextProp(masked, unmasked, obfuscated);

            const delta = masked.length - previousMaskedValue.current.length;

            previousMaskedValue.current = masked;

            setSelection(prev => ({
                start: prev.start + delta,
                end: prev.end + delta,
            }));
        },
        [onChangeTextProp, setSelection],
    );

    const {
        value,
        onChangeText: _onChangeText,
        placeholder,
    } = useMaskedInputPropsInternal({
        mask,
        obfuscationCharacter,
        value: valueProp,
        onChangeText,
        showObfuscatedValue,
        placeholderFillCharacter,
    });

    const previousMaskedValue = useRef(value);

    return useMemo(
        () => ({
            selection,
            value,
            onChangeText: _onChangeText,
            placeholder,
            onSelectionChange,
            onKeyPress,
        }),
        [_onChangeText, onKeyPress, onSelectionChange, placeholder, selection, value],
    );
};

export default useMaskedInputProps;
