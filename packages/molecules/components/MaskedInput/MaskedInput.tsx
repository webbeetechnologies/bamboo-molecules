import { forwardRef, memo } from 'react';

import { useMaskedInputProps } from '../../hooks';
import type { MaskedInputProps } from './types';
import { TextInput } from '../TextInput';

const MaskedInput = (
    {
        mask,
        obfuscationCharacter,
        value: valueProp,
        onChangeText,
        showObfuscatedValue,
        placeholderFillCharacter,
        placeholder,
        ...rest
    }: MaskedInputProps,
    ref: any,
) => {
    const maskedProps = useMaskedInputProps({
        mask,
        obfuscationCharacter,
        value: valueProp,
        onChangeText,
        showObfuscatedValue,
        placeholderFillCharacter,
    });

    return <TextInput {...rest} {...maskedProps} placeholder={placeholder} ref={ref} />;
};

export default memo(forwardRef(MaskedInput));
