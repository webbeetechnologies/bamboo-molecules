import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import DatePickerDockedDefault from './DatePickerDocked';

registerMoleculesComponents({
    DatePickerDocked: DatePickerDockedDefault,
});

export const DatePickerDocked = getRegisteredMoleculesComponent('DatePickerDocked');

export {
    datePickerDockedStyles,
    datePickerMonthPickerStyles,
    datePickerDockedHeaderStyles,
    datePickerDockedMonthItemStyles,
    datePickerDockedMonthStyles,
    datePickerHeaderItemStyles,
} from './utils';
export { DatePickerDockedProps } from './types';
