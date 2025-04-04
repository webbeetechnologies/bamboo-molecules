import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import OptionListDefault from './OptionList';

registerMoleculesComponents({
    OptionList: OptionListDefault,
});

export const OptionList = getRegisteredComponentWithFallback('OptionList', OptionListDefault);

export { Props as OptionListProps, IOptionList, OptionListRenderItemInfo } from './OptionList';
export { optionListStyles } from './utils';
