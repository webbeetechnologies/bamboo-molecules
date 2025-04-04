import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import HelperTextDefault from './HelperText';

registerMoleculesComponents({
    HelperText: HelperTextDefault,
});

export const HelperText = getRegisteredComponentWithFallback('HelperText', HelperTextDefault);

export { styles as helperTextStyles } from './utils';
