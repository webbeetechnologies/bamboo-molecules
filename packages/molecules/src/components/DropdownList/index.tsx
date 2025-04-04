import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import DropdownListDefault from './DropdownList';

registerMoleculesComponents({
    DropdownList: DropdownListDefault,
});

export const DropdownList = getRegisteredComponentWithFallback('DropdownList', DropdownListDefault);

export { dropdownListStyles } from './utils';
