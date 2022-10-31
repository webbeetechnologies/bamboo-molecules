import { forwardRef, memo, useCallback, useState } from 'react';
import { formatWithMask, Mask, Masks } from 'react-native-mask-input';

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
};

export const NumberInputMasks = {
    ...Masks,
    // define our own masks here
};

const NumberInput = (
    {
        containerStyle,
        onChangeText,
        keyboardType = 'numeric',
        mask,
        obfuscationCharacter = '',
        ...rest
    }: Props,
    ref: any,
) => {
    const { View, TextInput } = useMolecules();
    const [number, setNumber] = useState('');

    const onChangeWithNumberMask = useCallback(
        (text: string) => {
            const { masked, unmasked, obfuscated } = formatWithMask({
                mask,
                text,
                obfuscationCharacter,
            });
            const maskedText = mask ? masked : text.replace(/[^0-9]/g, '');

            if (!onChangeText) setNumber(maskedText);

            onChangeText?.(maskedText, unmasked || text, obfuscated);
        },
        [onChangeText, mask, obfuscationCharacter],
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
