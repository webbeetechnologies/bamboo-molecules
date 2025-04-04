import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import MaskedInputDefault from './MaskedInput';

registerMoleculesComponents({
    MaskedInput: MaskedInputDefault,
});

export const MaskedInput = getRegisteredMoleculesComponent('MaskedInput');

export { Mask, MaskItem, MaskArray } from 'react-native-mask-input';
export { MaskedInputProps } from './types';
