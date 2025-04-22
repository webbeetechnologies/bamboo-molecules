import type { Mask } from 'react-native-mask-input';

export type UseMaskedInputProps = {
    value: string;
    mask?: Mask;
    onChangeText(masked: string, unmasked: string, obfuscated: string): void;
    showObfuscatedValue?: boolean;
    placeholderFillCharacter?: string;
    obfuscationCharacter?: string;
};
