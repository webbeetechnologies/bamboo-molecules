import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import NumberRangeInputDefault from './NumberRangeInput';

registerMoleculesComponents({
    NumberRangeInput: NumberRangeInputDefault,
});

export const NumberRangeInput = getRegisteredComponentWithFallback(
    'NumberRangeInput',
    NumberRangeInputDefault,
);

export { Props as NumberRangeInputProps } from './NumberRangeInput';
export { numberRangeInputStyles } from './utils';
