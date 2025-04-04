import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import DropdownListPopoverDefault from './DropdownListPopover';

registerMoleculesComponents({
    DropdownListPopover: DropdownListPopoverDefault,
});

export const DropdownListPopover = getRegisteredComponentWithFallback(
    'DropdownListPopover',
    DropdownListPopoverDefault,
);

export { defaultStyles } from './utils';
