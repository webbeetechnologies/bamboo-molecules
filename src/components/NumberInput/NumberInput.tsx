import { forwardRef, memo, useMemo } from 'react';
import { MaskArray, createNumberMask } from 'react-native-mask-input';

import { useMolecules } from '../../hooks';
import type { TextInputProps } from '../TextInput';

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
    prefix?: MaskArray;
};

const NumberInput = (
    {
        keyboardType = 'numeric',
        delimiter = '.',
        precision = 2,
        separator = '',
        allowDecimals = true,
        allowNegative = true,
        prefix,
        ...rest
    }: Props,
    ref: any,
) => {
    const { MaskedInput } = useMolecules();
    const mask = useMemo(
        () =>
            createNumberMask({
                delimiter,
                precision: !allowDecimals ? 0 : precision,
                separator,
                prefix: prefix ? prefix : allowNegative ? [/^[\d+-]+$/] : [/^[\d+]+$/],
            }),
        [allowDecimals, allowNegative, delimiter, precision, prefix, separator],
    );

    return <MaskedInput mask={mask} {...rest} keyboardType={keyboardType} ref={ref} />;
};

export default memo(forwardRef(NumberInput));
