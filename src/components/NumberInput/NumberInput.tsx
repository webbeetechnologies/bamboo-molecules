import { forwardRef, memo, useMemo } from 'react';
import { MaskArray, createNumberMask } from 'react-native-mask-input';

import { useMolecules } from '../../hooks';
import type { TextInputProps } from '../TextInput';

export type Props = TextInputProps & {
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
     * Mask to be prefixed on the mask result
     * */
    prefix?: MaskArray;
};

const NumberInput = (
    {
        keyboardType = 'numeric',
        delimiter = '.',
        precision = 0,
        separator = ',',
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
                precision,
                separator,
                prefix,
            }),
        [delimiter, precision, prefix, separator],
    );

    return <MaskedInput mask={mask} {...rest} keyboardType={keyboardType} ref={ref} />;
};

export default memo(forwardRef(NumberInput));
