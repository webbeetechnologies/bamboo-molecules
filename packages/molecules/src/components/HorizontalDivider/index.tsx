import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import HorizontalDividerDefault from './HorizontalDivider';

registerMoleculesComponents({
    HorizontalDivider: HorizontalDividerDefault,
});

export const HorizontalDivider = (getRegisteredMoleculesComponent('HorizontalDivider') ??
    HorizontalDividerDefault) as typeof HorizontalDividerDefault;

export { Props as HorizontalDividerProps, horizontalDividerStyles } from './HorizontalDivider';
