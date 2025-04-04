import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import NumberInputDefault from './NumberInput';

registerMoleculesComponents({
    NumberInput: NumberInputDefault,
});

export const NumberInput = getRegisteredMoleculesComponent('NumberInput');
