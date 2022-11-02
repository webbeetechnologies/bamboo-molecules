import { forwardRef, memo, useCallback, useMemo } from 'react';
import { formatWithMask, Mask, Masks, createNumberMask } from 'react-native-mask-input';

import { useControlledValue, useMolecules } from '../../hooks';
import type { TextInputProps } from '../TextInput';

export type Props = TextInputProps & {
    /**
     * Number-only keyboardType
     */
    keyboardType?: 'number-pad' | 'decimal-pad' | 'numeric' | 'phone-pad';
    /**
     * Mask
     */
    mask?: Mask;
    /**
     * Character to be used on the obfuscated characteres. Defaults to `"*"`
     */
    obfuscationCharacter?: string;
    /**
     * separator for the default number mask
     */
    separator?: '.' | ',';
};

export const NumberInputMasks = {
    ...Masks,
    // define our own masks here
    NUM_WITH_DOT: createNumberMask({ separator: '.', delimiter: '', precision: 2 }),
    NUM_WITH_COMMA: createNumberMask({ separator: ',', delimiter: '', precision: 2 }),
};

const NumberInput = (
    {
        containerStyle,
        onChangeText,
        keyboardType = 'numeric',
        mask,
        obfuscationCharacter = '',
        separator = '.',
        editable = true,
        disabled = false,
        value,
        ...rest
    }: Props,
    ref: any,
) => {
    const { View, TextInput } = useMolecules();

    const defaultMask = useMemo(
        () => (separator === '.' ? NumberInputMasks.NUM_WITH_DOT : NumberInputMasks.NUM_WITH_COMMA),
        [separator],
    );

    const handleMaskString = useCallback(
        (text: string = '') => {
            const { masked } = formatWithMask({
                mask: mask || defaultMask,
                text,
                obfuscationCharacter,
            });

            return masked;
        },
        [mask, defaultMask, obfuscationCharacter],
    );

    const [number, onChangeNumber] = useControlledValue(
        value,
        onChangeText,
        !editable || disabled,
        handleMaskString,
    );

    return (
        <View style={containerStyle}>
            <TextInput
                {...rest}
                value={number}
                onChangeText={onChangeNumber}
                keyboardType={keyboardType}
                editable={editable}
                disabled={disabled}
                ref={ref}
            />
        </View>
    );
};

export default memo(forwardRef(NumberInput));
