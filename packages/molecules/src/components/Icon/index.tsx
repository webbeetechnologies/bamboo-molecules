import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import IconDefault from './Icon';

registerMoleculesComponents({
    Icon: IconDefault,
});

export const Icon = (getRegisteredMoleculesComponent('Icon') ?? IconDefault) as typeof IconDefault;

export type { IconProps, IconPacks, IconType } from './types';
export { registerCustomIconType } from './iconFactory';
