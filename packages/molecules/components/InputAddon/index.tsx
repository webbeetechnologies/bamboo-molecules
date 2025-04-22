import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import InputAddonDefault from './InputAddon';

registerMoleculesComponents({
    InputAddon: InputAddonDefault,
});

export const InputAddon = getRegisteredComponentWithFallback('InputAddon', InputAddonDefault);

export { inputAddonStyles } from './utils';
export { Props as InputAddonProps } from './InputAddon';
