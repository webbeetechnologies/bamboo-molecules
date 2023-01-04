import { forwardRef, memo } from 'react';

import { useMolecules, useMaskedInputProps } from '../../hooks';
import type { MaskedInputProps } from './types';

const MaskedInput = (
    {
        mask,
        obfuscationCharacter,
        value: valueProp,
        onChangeText,
        showObfuscatedValue,
        placeholderFillCharacter,
        ...rest
    }: MaskedInputProps,
    ref: any,
) => {
    const { TextInput } = useMolecules();

    const maskedProps = useMaskedInputProps({
        mask,
        obfuscationCharacter,
        value: valueProp,
        onChangeText,
        showObfuscatedValue,
        placeholderFillCharacter,
    });

    return <TextInput {...rest} {...maskedProps} ref={ref} />;
};

export default memo(forwardRef(MaskedInput));
