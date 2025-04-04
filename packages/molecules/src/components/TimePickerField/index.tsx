import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import TimePickerFieldDefault from './TimePickerField';

registerMoleculesComponents({
    TimePickerField: TimePickerFieldDefault,
});

export const TimePickerField = getRegisteredMoleculesComponent('TimePickerField');

export { styles, sanitizeTimeString } from './utils';
