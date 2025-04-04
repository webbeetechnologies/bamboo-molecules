import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import DropdownListPopoverDefault from './DropdownListPopover';

registerMoleculesComponents({
    DropdownListPopover: DropdownListPopoverDefault,
});

export const DropdownListPopover = getRegisteredMoleculesComponent('DropdownListPopover');

export { defaultStyles } from './utils';
