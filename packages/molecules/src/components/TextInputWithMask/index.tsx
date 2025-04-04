import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import TextInputWithMaskDefault from './TextInputMask';

registerMoleculesComponents({
    TextInputWithMask: TextInputWithMaskDefault,
});

export const TextInputWithMask = getRegisteredMoleculesComponent('TextInputWithMask');
