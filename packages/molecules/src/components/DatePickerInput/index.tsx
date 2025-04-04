import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import DatePickerInputDefault from './DatePickerInput';

registerMoleculesComponents({
    DatePickerInput: DatePickerInputDefault,
});

export const DatePickerInput = getRegisteredComponentWithFallback('DatePickerInput');

export { DatePickerInputProps } from './types';
export { datePickerInputStyles } from './utils';
