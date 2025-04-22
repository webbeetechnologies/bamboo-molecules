import { forwardRef, memo, useMemo } from 'react';
import type { TextInputProps } from '../TextInput';
import { createNumberMask } from '../../utils';
import { MaskedInput } from '../MaskedInput';

export type Props = Omit<TextInputProps, 'value' | 'defaultValue' | 'onChangeText'> & {
    /**
     * required for all the maskedinputs
     * */
    value: string;
    /**
     * required for all the maskedinput
     * */
    onChangeText: (value: string) => void;
    /**
     * Number-only keyboardType
     */
    keyboardType?: 'number-pad' | 'decimal-pad' | 'numeric' | 'phone-pad';
    /**
     * Character for thousands delimiter. Defaults to `"."`
     * */
    delimiter?: string;
    /**
     * Decimal precision. Defaults to `2`
     * */
    precision?: number;
    /**
     * Decimal separator character. Defaults to `","`
     * */
    separator?: string;
    /**
     * If this is false, precision will be ignored
     * */
    allowDecimals?: boolean;
    /**
     * For default prefix, if we want to allow negative or not
     * If the custom prefix is passed, this will be ignored.
     * */
    allowNegative?: boolean;
    /**
     * Mask to be prefixed on the mask result
     * */
    prefix?: string | string[];
    /**
     * Mask to be suffixed on the mask result
     * */
    suffix?: string | string[];
};

const NumberInput = (
    {
        keyboardType = 'numeric',
        delimiter = ',',
        precision = 2,
        separator = '.',
        allowDecimals = true,
        allowNegative = true,
        prefix = [],
        suffix = '',
        ...rest
    }: Props,
    ref: any,
) => {
    const mask = useMemo(
        () =>
            createNumberMask({
                delimiter,
                precision: !allowDecimals ? 0 : precision,
                separator,
                prefix,
                allowNegative,
                suffix,
            }),
        [allowDecimals, allowNegative, delimiter, precision, prefix, separator, suffix],
    );

    return <MaskedInput mask={mask} {...rest} keyboardType={keyboardType} ref={ref} />;
};

export default memo(forwardRef(NumberInput));
