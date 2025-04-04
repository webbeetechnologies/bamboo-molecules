import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import StateLayerDefault from './StateLayer';

registerMoleculesComponents({
    StateLayer: StateLayerDefault,
});

export const StateLayer = (getRegisteredMoleculesComponent('StateLayer') ??
    StateLayerDefault) as typeof StateLayerDefault;

export { stateLayerStyles } from './utils';
