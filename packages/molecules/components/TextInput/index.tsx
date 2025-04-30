import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import TextInputDefault from './TextInput';

registerMoleculesComponents({
    TextInput: TextInputDefault,
});

export const TextInput = getRegisteredComponentWithFallback('TextInput', TextInputDefault);

export {
    Props as TextInputProps,
    ElementProps as TextInputElementProps,
    TextInputHandles,
} from './TextInput';
export { styles as textInputStyles } from './utils';
export type * from './types';
