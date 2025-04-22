import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import VerticalDividerDefault from './VerticalDivider';

registerMoleculesComponents({
    VerticalDivider: VerticalDividerDefault,
});

export const VerticalDivider = getRegisteredComponentWithFallback(
    'VerticalDivider',
    VerticalDividerDefault,
);

export { Props as VerticalDividerProps, verticalDividerStyles } from './VerticalDivider';
