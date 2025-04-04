import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import MaskedInputDefault from './MaskedInput';

registerMoleculesComponents({
    MaskedInput: MaskedInputDefault,
});

export const MaskedInput = getRegisteredComponentWithFallback('MaskedInput', MaskedInputDefault);

export { Mask, MaskItem, MaskArray } from 'react-native-mask-input';
export { MaskedInputProps } from './types';
