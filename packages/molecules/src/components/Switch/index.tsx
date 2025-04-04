import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import SwitchDefault from './Switch';

registerMoleculesComponents({
    Switch: SwitchDefault,
});

export const Switch = getRegisteredMoleculesComponent('Switch');

export { switchStyles as defaultSwitchStyles } from './utils';
