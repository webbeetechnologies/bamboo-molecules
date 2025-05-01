import PortalDefault from './Portal';
import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';

registerMoleculesComponents({
    Portal: PortalDefault,
});

// @ts-ignore TODO - fix this error
export const Portal = getRegisteredComponentWithFallback('Portal', PortalDefault);

export { PortalHost, PortalProvider } from '@gorhom/portal';
export { registerPortalContext } from './Portal';
