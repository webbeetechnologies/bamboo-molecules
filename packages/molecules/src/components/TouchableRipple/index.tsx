import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import TouchableRippleDefault from './TouchableRipple';

registerMoleculesComponents({
    TouchableRipple: TouchableRippleDefault,
});

export const TouchableRipple = getRegisteredComponentWithFallback(
    'TouchableRipple',
    TouchableRippleDefault,
);

export { Props as TouchableRippleProps } from './TouchableRipple';

export { touchableRippleStyles } from './utils';
