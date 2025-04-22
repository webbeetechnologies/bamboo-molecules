import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import MaterialToastDefault from './MaterialToast';

registerMoleculesComponents({
    MaterialToast: MaterialToastDefault,
});

export const MaterialToast = getRegisteredComponentWithFallback(
    'MaterialToast',
    MaterialToastDefault,
);

export { styles } from './utils';
export { default as Toast } from 'react-native-toast-message';
export * from 'react-native-toast-message';
