import { forwardRef, memo, useCallback, useRef } from 'react';

import { useMolecules } from '../../hooks';
import { useMaskedInputProps, useSelectionHandler } from './utils';
import type { MaskedInputProps } from './types';

const MaskedInput = (
    {
        mask,
        obfuscationCharacter,
        value: valueProp,
        onChangeText: onChangeTextProp,
        showObfuscatedValue,
        placeholderFillCharacter,
        ...rest
    }: MaskedInputProps,
    ref: any,
) => {
    const { TextInput } = useMolecules();

    const { selection, setSelection, onSelectionChange, onKeyPress } = useSelectionHandler({
        initialStart: valueProp?.length || 0,
        initialEnd: valueProp?.length || 0,
    });

    const onChangeText = useCallback(
        (masked: string, unmasked: string, obfuscated: string) => {
            onChangeTextProp?.(masked, unmasked, obfuscated);

            const delta = masked.length - previousMaskedValue.current.length;

            previousMaskedValue.current = masked;

            setSelection(prev => ({
                start: prev.start + delta,
                end: prev.end + delta,
            }));
        },
        [onChangeTextProp, setSelection],
    );

    const maskedProps = useMaskedInputProps({
        mask,
        obfuscationCharacter,
        value: valueProp,
        onChangeText,
        showObfuscatedValue,
        placeholderFillCharacter,
    });

    const previousMaskedValue = useRef(maskedProps.value);

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

export default memo(forwardRef(MaskedInput));
