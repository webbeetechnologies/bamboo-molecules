import { forwardRef, memo, useCallback, useState } from 'react';

import { useMolecules } from '../../hooks';
import type { TextInputProps } from '../TextInput';

export type Props = TextInputProps & {
    /**
     * Number-only keyboardType
     */
    keyboardType?: 'number-pad' | 'decimal-pad' | 'numeric' | 'phone-pad';
};

const toNumber = (val: string = '', prevVal: string = '') => {
    const sanitizedVal = val.replace(/[^0-9.]/g, '');

    return !isNaN(Number(sanitizedVal)) ? sanitizedVal : prevVal;
};

const NumberInput = (
    {
        onChangeText,
        keyboardType = 'numeric',
        editable = true,
        disabled = false,
        value: valueProp,
        defaultValue = '',
        ...rest
    }: Props,
    ref: any,
) => {
    const { TextInput } = useMolecules();

    const [value, setValue] = useState(toNumber(defaultValue));

    const onChangeValue = useCallback(
        (currentVal: string) => {
            if (!onChangeText) {
                setValue(toNumber(currentVal, value));
                return;
            }

            onChangeText?.(toNumber(currentVal, valueProp));
        },
        [onChangeText, value, valueProp],
    );

    return (
        <TextInput
            {...rest}
            value={toNumber(valueProp) || value}
            onChangeText={onChangeValue}
            keyboardType={keyboardType}
            editable={editable}
            disabled={disabled}
            ref={ref}
        />
    );
};

export default memo(forwardRef(NumberInput));
