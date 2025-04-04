import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import DateTimePickerDefault from './DateTimePicker';

registerMoleculesComponents({
    DateTimePicker: DateTimePickerDefault,
});

export const DateTimePicker = getRegisteredComponentWithFallback(
    'DateTimePicker',
    DateTimePickerDefault,
);

export { Props as DateTimePickerProps } from './DateTimePicker';
export { dateTimePickerStyles } from './utils';
