import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import TextInputDefault from './TextInput';

registerMoleculesComponents({
    TextInput: TextInputDefault,
});

export const TextInput = getRegisteredMoleculesComponent('TextInput');

export { Props as TextInputProps, ElementProps as TextInputElementProps } from './TextInput';
export { styles as textInputStyles } from './utils';
