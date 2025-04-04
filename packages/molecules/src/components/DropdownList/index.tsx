import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import DropdownListDefault from './DropdownList';

registerMoleculesComponents({
    DropdownList: DropdownListDefault,
});

export const DropdownList = getRegisteredMoleculesComponent('DropdownList');

export { dropdownListStyles } from './utils';
