import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import FilePickerDefault from './FilePicker';

registerMoleculesComponents({
    FilePicker: FilePickerDefault,
});

export const FilePicker = getRegisteredMoleculesComponent('FilePicker');

export { defaultStyles } from './utils';
