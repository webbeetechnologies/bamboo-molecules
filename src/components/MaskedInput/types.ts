import type { TextInputProps } from '../TextInput';
import type { Mask, MaskInputProps } from 'react-native-mask-input';

export type MaskedInputProps = Omit<TextInputProps, 'onChangeText'> & {
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
