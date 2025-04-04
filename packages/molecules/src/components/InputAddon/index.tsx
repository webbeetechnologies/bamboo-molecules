import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import InputAddonDefault from './InputAddon';

registerMoleculesComponents({
    InputAddon: InputAddonDefault,
});

export const InputAddon = getRegisteredMoleculesComponent('InputAddon');

export { inputAddonStyles } from './utils';
