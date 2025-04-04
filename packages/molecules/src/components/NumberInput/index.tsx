import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import NumberInputDefault from './NumberInput';

registerMoleculesComponents({
    NumberInput: NumberInputDefault,
});

export const NumberInput = getRegisteredComponentWithFallback('NumberInput', NumberInputDefault);
