import { forwardRef, memo, useCallback } from 'react';
import { formatWithMask, Mask, MaskInputProps } from 'react-native-mask-input';
import { useControlledValue, useMolecules } from '../../hooks';
import type { TextInputProps } from '../TextInput';

export type Props = Omit<TextInputProps, 'onChangeText'> & {
    /**
     * Mask
     */
    mask?: Mask;
    /**
     * Callback that is called when the text input's text changes.
     * @param masked Masked text
     * @param unmasked Unmasked text
     * @param obfuscated Obfuscated text
     */
    onChangeText?: MaskInputProps['onChangeText'];
    /**
     * Character to be used on the obfuscated characteres. Defaults to "*"
     */
    obfuscationCharacter?: string;
};

const MaskedInput = (
    {
        mask,
        obfuscationCharacter,
        value: valueProp,
        defaultValue = '',
        onChangeText: onChangeTextProp,
        ...rest
    }: Props,
    ref: any,
) => {
    const { TextInput } = useMolecules();

    const manipulateValue = useCallback(
        (text: string | undefined) => {
            const { masked } = formatWithMask({
                mask,
                obfuscationCharacter,
                text,
            });

            return masked;
        },
        [mask, obfuscationCharacter],
    );

    const onChangeText = useCallback(
        (text: string) => {
            const { masked, unmasked, obfuscated } = formatWithMask({
                mask,
                obfuscationCharacter,
                text,
            });

            onChangeTextProp?.(masked, unmasked, obfuscated);
        },
        [mask, obfuscationCharacter, onChangeTextProp],
    );

    const [value, onValueChange] = useControlledValue({
        value: valueProp,
        defaultValue,
        onChange: onChangeText,
        manipulateValue,
    });

    return <TextInput {...rest} value={value} onChangeText={onValueChange} ref={ref} />;
};

export default memo(forwardRef(MaskedInput));
