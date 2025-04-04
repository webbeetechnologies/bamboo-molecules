import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import PopoverDefault from './Popover';

registerMoleculesComponents({
    Popover: PopoverDefault,
});

export const Popover = getRegisteredComponentWithFallback('Popover', PopoverDefault);

export { popoverFactory } from './Popover';
export { PopoverProps } from './types';
export { defaultStyles } from './utils';
