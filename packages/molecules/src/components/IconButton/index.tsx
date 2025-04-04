import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import IconButtonDefault from './IconButton';

registerMoleculesComponents({
    IconButton: IconButtonDefault,
});

export const IconButton = (getRegisteredMoleculesComponent('IconButton') ??
    IconButtonDefault) as typeof IconButtonDefault;

export { defaultStyles } from './utils';
