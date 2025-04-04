import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import DateTimePickerDefault from './DateTimePicker';

registerMoleculesComponents({
    DateTimePicker: DateTimePickerDefault,
});

export const DateTimePicker = getRegisteredComponentWithFallback(
    'DateTimePicker',
    DateTimePickerDefault,
);

export { dateTimePickerStyles } from './utils';
