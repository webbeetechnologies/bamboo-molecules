import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import DateTimePickerDefault from './DateTimePicker';

registerMoleculesComponents({
    DateTimePicker: DateTimePickerDefault,
});

export const DateTimePicker = getRegisteredMoleculesComponent('DateTimePicker');

export { dateTimePickerStyles } from './utils';
