import { forwardRef, memo, useCallback, useRef } from 'react';

import { useMolecules } from '../../hooks';
import { useMaskedInputProps, useSelectionHandler } from './utils';
import type { MaskedInputProps } from './types';

const MaskedInput = (
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

    const { selection, setSelection, onSelectionChange, onKeyPress } = useSelectionHandler({
        initialStart: valueProp?.length || 0,
        initialEnd: valueProp?.length || 0,
    });

    const onChangeTextCallback = useCallback(
        (masked: string) => {
            const delta = masked.length - previousMaskedValue.current.length;

            previousMaskedValue.current = masked;

            setSelection({
                start: selection.start + delta,
                end: selection.end + delta,
            });
        },
        [selection.end, selection.start, setSelection],
    );

    const maskedProps = useMaskedInputProps({
        mask,
        obfuscationCharacter,
        value: valueProp,
        defaultValue,
        onChangeText: onChangeTextProp,
        showObfuscatedValue,
        placeholderFillCharacter,
        onChangeTextCallback,
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
