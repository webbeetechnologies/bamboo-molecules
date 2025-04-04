import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import VerticalDividerDefault from './VerticalDivider';

registerMoleculesComponents({
    VerticalDivider: VerticalDividerDefault,
});

export const VerticalDivider = getRegisteredMoleculesComponent('VerticalDivider');

export { Props as VerticalDividerProps, verticalDividerStyles } from './VerticalDivider';
