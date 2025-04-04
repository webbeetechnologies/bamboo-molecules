import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import FABDefault from './FAB';

registerMoleculesComponents({
    FAB: FABDefault,
});

export const FAB = getRegisteredComponentWithFallback('FAB', FABDefault);

export { fabStyles } from './utils';
export { States } from './utils';
