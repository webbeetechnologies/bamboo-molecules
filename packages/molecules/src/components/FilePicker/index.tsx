import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import FilePickerDefault from './FilePicker';

registerMoleculesComponents({
    FilePicker: FilePickerDefault,
});

export const FilePicker = getRegisteredComponentWithFallback('FilePicker', FilePickerDefault);

export { defaultStyles } from './utils';
