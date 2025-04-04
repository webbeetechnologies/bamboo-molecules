import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import OptionListDefault from './OptionList';

registerMoleculesComponents({
    OptionList: OptionListDefault,
});

export const OptionList = getRegisteredMoleculesComponent('OptionList');

export { Props as OptionListProps, IOptionList, OptionListRenderItemInfo } from './OptionList';
export { optionListStyles } from './utils';
