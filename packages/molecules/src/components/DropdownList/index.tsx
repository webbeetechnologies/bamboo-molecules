import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import DropdownListDefault from './DropdownList';

registerMoleculesComponents({
    DropdownList: DropdownListDefault,
});

export const DropdownList = getRegisteredComponentWithFallback('DropdownList', DropdownListDefault);

export { Props as DropdownListProps } from './DropdownList';
export { dropdownListStyles } from './utils';
