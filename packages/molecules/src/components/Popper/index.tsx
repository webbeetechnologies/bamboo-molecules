import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import PopperDefault from './Popper';

registerMoleculesComponents({
    Popper: PopperDefault,
});

export const Popper = getRegisteredComponentWithFallback('Popper', PopperDefault);

export type { PopperProps } from './types';
