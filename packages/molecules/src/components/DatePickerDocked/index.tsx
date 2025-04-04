import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import DatePickerDockedDefault from './DatePickerDocked';

registerMoleculesComponents({
    DatePickerDocked: DatePickerDockedDefault,
});

export const DatePickerDocked = getRegisteredComponentWithFallback(
    'DatePickerDocked',
    DatePickerDockedDefault,
);

export {
    datePickerDockedStyles,
    datePickerMonthPickerStyles,
    datePickerDockedHeaderStyles,
    datePickerDockedMonthItemStyles,
    datePickerDockedMonthStyles,
    datePickerHeaderItemStyles,
} from './utils';
export { DatePickerDockedProps } from './types';
