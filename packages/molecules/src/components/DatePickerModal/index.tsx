import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import DatePickerModalDefault from './DatePickerModal';

registerMoleculesComponents({
    DatePickerModal: DatePickerModalDefault,
});

export const DatePickerModal = getRegisteredMoleculesComponent('DatePickerModal');

export { DatePickerModalProps } from './types';
export {
    datePickerModalStyles,
    datePickerModalContentHeaderStyles,
    datePickerModalHeaderStyles,
    datePickerModalHeaderBackgroundStyles,
    datePickerModalEditStyles,
} from './utils';
