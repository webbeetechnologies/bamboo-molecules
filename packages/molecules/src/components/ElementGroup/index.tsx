import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import ElementGroupDefault from './ElementGroup';

registerMoleculesComponents({
    ElementGroup: ElementGroupDefault,
});

export const ElementGroup = getRegisteredMoleculesComponent('ElementGroup');

export { elementGroupStyles } from './utils';
