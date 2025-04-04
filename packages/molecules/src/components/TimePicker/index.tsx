import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import TimePickerDefault from './TimePicker';

registerMoleculesComponents({
    TimePicker: TimePickerDefault,
});

export const TimePicker = getRegisteredMoleculesComponent('TimePicker');

export {
    timePickerStyles,
    timePickerInputStyles,
    timePickerInputsStyles,
    timePickerClockStyles,
    timePickerClockHoursStyles,
    timePickerClockMinutesStyles,
    timePickerAmPmSwitcherStyles,
} from './utils';
