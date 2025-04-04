import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import PopoverDefault from './Popover';

registerMoleculesComponents({
    Popover: PopoverDefault,
});

export const Popover = getRegisteredMoleculesComponent('Popover');

export { PopoverProps } from './types';
export { defaultStyles } from './utils';
