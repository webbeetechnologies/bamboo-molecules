import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import DatePickerInputDefault from './DatePickerInput';

registerMoleculesComponents({
    DatePickerInput: DatePickerInputDefault,
});

export const DatePickerInput = getRegisteredComponentWithFallback(
    'DatePickerInput',
    DatePickerInputDefault,
);

export { DatePickerInputProps } from './types';
export { datePickerInputStyles } from './utils';
