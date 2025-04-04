import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import NumberRangeInputDefault from './NumberRangeInput';

registerMoleculesComponents({
    NumberRangeInput: NumberRangeInputDefault,
});

export const NumberRangeInput = getRegisteredMoleculesComponent('NumberRangeInput');

export { numberRangeInputStyles } from './utils';
