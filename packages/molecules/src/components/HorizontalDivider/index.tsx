import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import HorizontalDividerDefault from './HorizontalDivider';

registerMoleculesComponents({
    HorizontalDivider: HorizontalDividerDefault,
});

export const HorizontalDivider = getRegisteredComponentWithFallback(
    'HorizontalDivider',
    HorizontalDividerDefault,
);

export { Props as HorizontalDividerProps, horizontalDividerStyles } from './HorizontalDivider';
