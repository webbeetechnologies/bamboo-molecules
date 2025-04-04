import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import BackdropDefault from './Backdrop';

registerMoleculesComponents({
    Backdrop: BackdropDefault,
});

export const Backdrop = getRegisteredMoleculesComponent('Backdrop');

export type { BackdropProps } from './types';

export { backdropStyles } from './utils'; // to import in ThemeProvider
