import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import StateLayerDefault from './StateLayer';

registerMoleculesComponents({
    StateLayer: StateLayerDefault,
});

export const StateLayer = getRegisteredComponentWithFallback('StateLayer', StateLayerDefault);

export { stateLayerStyles } from './utils';
