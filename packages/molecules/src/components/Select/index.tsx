import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import SelectDefault from './Select';

registerMoleculesComponents({
    Select: SelectDefault,
});

export const Select = getRegisteredMoleculesComponent('Select');

export {
    Props as SelectProps,
    ISelect,
    SelectHandles,
    SelectRenderItem,
    SelectRenderItemInfo,
} from './Select'; // to import in ComponentsProvider
export { selectStyles } from './utils'; // to import in ThemeProvider
