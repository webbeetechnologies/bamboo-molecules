import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import DatePickerModalDefault from './DatePickerModal';

registerMoleculesComponents({
    DatePickerModal: DatePickerModalDefault,
});

export const DatePickerModal = getRegisteredComponentWithFallback(
    'DatePickerModal',
    DatePickerModalDefault,
);

export { DatePickerModalProps } from './types';
export {
    datePickerModalStyles,
    datePickerModalContentHeaderStyles,
    datePickerModalHeaderStyles,
    datePickerModalHeaderBackgroundStyles,
    datePickerModalEditStyles,
} from './utils';
