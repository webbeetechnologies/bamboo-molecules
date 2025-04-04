import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import HelperTextDefault from './HelperText';

registerMoleculesComponents({
    HelperText: HelperTextDefault,
});

export const HelperText = getRegisteredMoleculesComponent('HelperText');

export { styles as helperTextStyles } from './utils';
