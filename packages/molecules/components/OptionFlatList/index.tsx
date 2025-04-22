import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import OptionFlatListDefault from './OptionFlatList';

registerMoleculesComponents({
    OptionFlatList: OptionFlatListDefault,
});

export const OptionFlatList = getRegisteredComponentWithFallback(
    'OptionFlatList',
    OptionFlatListDefault,
);

export {
    Props as OptionFlatListProps,
    IOptionFlatList,
    OptionFlatListRenderItemInfo,
} from './OptionFlatList';
export { optionFlatListStyles } from './utils';
