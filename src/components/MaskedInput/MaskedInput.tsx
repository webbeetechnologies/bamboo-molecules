import { forwardRef, memo } from 'react';
import { useMaskedInputProps } from 'react-native-mask-input';

import { useControlledValue, useMolecules } from '../../hooks';
import type { MaskedInputProps } from './types';

const MaskedInputMobile = (
    {
        mask,
        obfuscationCharacter,
        value: valueProp,
        defaultValue = '',
        onChangeText: onChangeTextProp,
        showObfuscatedValue,
        placeholderFillCharacter,
        ...rest
    }: MaskedInputProps,
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
        value,
        onChangeText: onValueChange,
        showObfuscatedValue,
        placeholderFillCharacter,
    });

    return <TextInput {...rest} {...maskedProps} ref={ref} />;
};

export default memo(forwardRef(MaskedInputMobile));
