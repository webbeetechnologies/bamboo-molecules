import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import DatePickerInputDefault from './DatePickerInput';

registerMoleculesComponents({
    DatePickerInput: DatePickerInputDefault,
});

export const DatePickerInput = getRegisteredMoleculesComponent('DatePickerInput');

export { DatePickerInputProps } from './types';
export { datePickerInputStyles } from './utils';
