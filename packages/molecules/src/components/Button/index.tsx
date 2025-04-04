import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import ButtonDefault from './Button';

registerMoleculesComponents({
    Button: ButtonDefault,
});

export const Button = getRegisteredComponentWithFallback('Button', ButtonDefault);

export { defaultStyles } from './utils';
