import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import FABDefault from './FAB';

registerMoleculesComponents({
    FAB: FABDefault,
});

export const FAB = getRegisteredMoleculesComponent('FAB');

export { fabStyles } from './utils';
export { States } from './utils';
