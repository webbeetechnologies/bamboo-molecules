import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import ElementGroupDefault from './ElementGroup';

registerMoleculesComponents({
    ElementGroup: ElementGroupDefault,
});

export const ElementGroup = getRegisteredComponentWithFallback('ElementGroup', ElementGroupDefault);

export { elementGroupStyles } from './utils';
