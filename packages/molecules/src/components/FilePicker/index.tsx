import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import FilePickerDefault from './FilePicker';

registerMoleculesComponents({
    FilePicker: FilePickerDefault,
});

export const FilePicker = getRegisteredComponentWithFallback('FilePicker', FilePickerDefault);

export { Props as FilePickerProps } from './FilePicker';
export { defaultStyles } from './utils';
