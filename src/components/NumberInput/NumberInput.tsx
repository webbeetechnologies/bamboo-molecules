import { forwardRef, memo, useCallback } from 'react';

import { useControlledValue, useMolecules } from '../../hooks';
import type { TextInputProps } from '../TextInput';

export type Props = TextInputProps & {
    /**
     * Number-only keyboardType
     */
    keyboardType?: 'number-pad' | 'decimal-pad' | 'numeric' | 'phone-pad';
};

const NumberInput = (
    { onChangeText, keyboardType = 'numeric', editable = true, disabled = false, ...rest }: Props,
    ref: any,
) => {
    const { TextInput } = useMolecules();

    const toNumber = useCallback((val: string = '', prevVal: string = '') => {
        const sanitizedVal = val.replace(/[^0-9.]/g, '');

        return !isNaN(Number(sanitizedVal)) ? sanitizedVal : prevVal;
    }, []);

    const [value, onChangeValue] = useControlledValue({
        value: rest.value,
        defaultValue: rest.defaultValue,
        onChange: onChangeText,
        disabled: !editable || disabled,
        manipulateValue: toNumber,
    });

    return (
        <TextInput
            {...rest}
            value={value}
            onChangeText={onChangeValue}
            keyboardType={keyboardType}
            editable={editable}
            disabled={disabled}
            ref={ref}
        />
    );
};

export default memo(forwardRef(NumberInput));
