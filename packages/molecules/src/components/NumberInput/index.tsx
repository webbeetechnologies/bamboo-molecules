import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import NumberInputDefault from './NumberInput';

registerMoleculesComponents({
    NumberInput: NumberInputDefault,
});

export { Props as NumberInputProps } from './NumberInput';

export const NumberInput = getRegisteredComponentWithFallback('NumberInput', NumberInputDefault);
