import { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import { formatWithMask, Mask, Masks, createNumberMask } from 'react-native-mask-input';

import { useMolecules } from '../../hooks';
import type { TextInputProps } from '../TextInput';

export type Props = Omit<TextInputProps, 'onChangeText'> & {
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
     * Callback that is called when the text input's text changes.
     * @param masked Masked text
     * @param unmasked Unmasked text
     * @param obfuscated Obfuscated text
     */
    onChangeText?: (masked: string, unmasked: string, obfuscated: string) => void;
    /**
     * separator for the default number mask
     */
    separator?: '.' | ',';
};

export const NumberInputMasks = {
    ...Masks,
    // define our own masks here
    NUM_WITH_DOT: createNumberMask({ separator: '.', delimiter: '', precision: 0 }),
    NUM_WITH_COMMA: createNumberMask({ separator: ',', delimiter: '', precision: 0 }),
};

const NumberInput = (
    {
        containerStyle,
        onChangeText,
        keyboardType = 'numeric',
        mask,
        obfuscationCharacter = '',
        separator = '.',
        ...rest
    }: Props,
    ref: any,
) => {
    const { View, TextInput } = useMolecules();
    const [number, setNumber] = useState('');

    const defaultMask = useMemo(
        () => (separator === '.' ? NumberInputMasks.NUM_WITH_DOT : NumberInputMasks.NUM_WITH_COMMA),
        [separator],
    );

    const onChangeWithNumberMask = useCallback(
        (text: string) => {
            const { masked, unmasked, obfuscated } = formatWithMask({
                mask: mask || defaultMask,
                text,
                obfuscationCharacter,
            });

            if (!onChangeText) setNumber(masked);

            onChangeText?.(masked, unmasked || text, obfuscated);
        },
        [mask, defaultMask, obfuscationCharacter, onChangeText],
    );

    return (
        <View style={containerStyle}>
            <TextInput
                value={number}
                onChangeText={onChangeWithNumberMask}
                {...rest}
                keyboardType={keyboardType}
                ref={ref}
            />
        </View>
    );
};

export default memo(forwardRef(NumberInput));
