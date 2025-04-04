import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import SurfaceDefault from './Surface';

registerMoleculesComponents({
    Surface: SurfaceDefault,
});

export const Surface = (getRegisteredMoleculesComponent('Surface') ??
    SurfaceDefault) as typeof SurfaceDefault;

export { Props as SurfaceProps } from './Surface';

export { defaultStyles as surfaceStyles } from './utils';
