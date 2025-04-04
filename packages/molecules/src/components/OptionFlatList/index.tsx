import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import OptionFlatListDefault from './OptionFlatList';

registerMoleculesComponents({
    OptionFlatList: OptionFlatListDefault,
});

export const OptionFlatList = getRegisteredMoleculesComponent('OptionFlatList');

export {
    Props as OptionFlatListProps,
    IOptionFlatList,
    OptionFlatListRenderItemInfo,
} from './OptionFlatList';
export { optionFlatListStyles } from './utils';
