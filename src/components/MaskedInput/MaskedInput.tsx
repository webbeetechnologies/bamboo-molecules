import { forwardRef, memo } from 'react';

import { useMolecules } from '../../hooks';
import { useMaskedInputProps } from './utils';
import type { MaskedInputProps } from './types';

const MaskedInput = (
    {
        mask,
        obfuscationCharacter,
        value,
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
        value,
        onChangeText,
        showObfuscatedValue,
        placeholderFillCharacter,
    });

    return <TextInput {...rest} {...maskedProps} ref={ref} />;
};

export default memo(forwardRef(MaskedInput));
