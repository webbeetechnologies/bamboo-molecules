import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import BadgeDefault from './Badge';

registerMoleculesComponents({
    Badge: BadgeDefault,
});

export const Badge = getRegisteredMoleculesComponent('Badge');

export { badgeStyles } from './utils';
