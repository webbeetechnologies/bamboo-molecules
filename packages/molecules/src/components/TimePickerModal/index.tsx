import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import TimePickerModalDefault from './TimePickerModal';

registerMoleculesComponents({
    TimePickerModal: TimePickerModalDefault,
});

export const TimePickerModal = getRegisteredMoleculesComponent('TimePickerModal');

export { styles } from './utils';
