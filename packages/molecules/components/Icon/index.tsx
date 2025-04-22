import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import IconDefault from './Icon';

registerMoleculesComponents({
    Icon: IconDefault,
});

export const Icon = getRegisteredComponentWithFallback('Icon', IconDefault);

export type { IconProps, IconPacks, IconType } from './types';
export { registerCustomIconType } from './iconFactory';
