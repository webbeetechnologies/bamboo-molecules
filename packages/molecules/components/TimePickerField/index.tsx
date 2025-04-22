import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import TimePickerFieldDefault from './TimePickerField';

registerMoleculesComponents({
    TimePickerField: TimePickerFieldDefault,
});

export const TimePickerField = getRegisteredComponentWithFallback(
    'TimePickerField',
    TimePickerFieldDefault,
);

export { Props as TimePickerFieldProps } from './TimePickerField';
export { styles, sanitizeTimeString } from './utils';
