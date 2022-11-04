import { forwardRef, memo } from 'react';

import { useControlledValue, useMolecules } from '../../hooks';
import type { TextInputProps } from '../TextInput';

export type Props = TextInputProps & {
    /**
     * Number-only keyboardType
     */
    keyboardType?: 'number-pad' | 'decimal-pad' | 'numeric' | 'phone-pad';
};

const toNumber = (val: string = '', prevVal: string = '') => {
    const sanitizedVal = val.replace(/[^0-9.-]/g, ''); // allows minus and decimal

    return !isNaN(Number(`${sanitizedVal}0`)) ? sanitizedVal : prevVal; // zero at the end because we want - signs and trailing dot to be recognized as a number. isNaN('+') => true but isNaN('+0') => false
};

const NumberInput = (
    {
        onChangeText,
        keyboardType = 'numeric',
        editable = true,
        disabled = false,
        value: valueProp,
        defaultValue,
        ...rest
    }: Props,
    ref: any,
) => {
    const { TextInput } = useMolecules();

    const [value, onChange] = useControlledValue({
        value: valueProp,
        defaultValue: defaultValue ?? '', // making one value defined so that textinput's useControlledValue's onChange won't be used
        disabled: !editable || disabled,
        onChange: onChangeText,
        manipulateValue: toNumber,
    });

    return (
        <TextInput
            {...rest}
            value={value}
            onChangeText={onChange}
            keyboardType={keyboardType}
            editable={editable}
            disabled={disabled}
            ref={ref}
        />
    );
};

export default memo(forwardRef(NumberInput));
