import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import TimePickerDefault from './TimePicker';

registerMoleculesComponents({
    TimePicker: TimePickerDefault,
});

export const TimePicker = getRegisteredComponentWithFallback('TimePicker', TimePickerDefault);

export {
    timePickerStyles,
    timePickerInputStyles,
    timePickerInputsStyles,
    timePickerClockStyles,
    timePickerClockHoursStyles,
    timePickerClockMinutesStyles,
    timePickerAmPmSwitcherStyles,
} from './utils';

export { Props as TimePickerProps } from './TimePicker';
