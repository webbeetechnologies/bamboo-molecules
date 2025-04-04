import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import ButtonDefault from './Button';

registerMoleculesComponents({
    Button: ButtonDefault,
});

export const Button = (getRegisteredMoleculesComponent('Button') ??
    ButtonDefault) as typeof ButtonDefault;

export { defaultStyles } from './utils';
