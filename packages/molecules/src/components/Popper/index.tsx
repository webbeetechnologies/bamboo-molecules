import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import PopperDefault from './Popper';

registerMoleculesComponents({
    Popper: PopperDefault,
});

export const Popper = getRegisteredMoleculesComponent('Popper');

export type { PopperProps } from './types';
