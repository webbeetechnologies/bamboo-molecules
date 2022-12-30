import { forwardRef, memo } from 'react';
import { Mask, MaskInputProps, useMaskedInputProps } from 'react-native-mask-input';
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
    /**
     * Whether or not to display the obfuscated value on the `TextInput`. Defaults to false
     */
    showObfuscatedValue?: boolean;
    /**
     * Character to be used as the "fill character" on the default placeholder
     */
    placeholderFillCharacter?: string;
};

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
    }: Props,
    ref: any,
) => {
    const { TextInput } = useMolecules();
    const [value, onValueChange] = useControlledValue({
        value: valueProp,
        onChange: onChangeTextProp,
        defaultValue,
    });

    const maskedProps = useMaskedInputProps({
        mask,
        obfuscationCharacter,
        value: value,
        onChangeText: onValueChange,
        showObfuscatedValue,
        placeholderFillCharacter,
    });

    return <TextInput {...rest} {...maskedProps} ref={ref} />;
};

export default memo(forwardRef(MaskedInput));
