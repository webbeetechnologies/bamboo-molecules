import { Portal as GorhomPortal } from '@gorhom/portal';
import { type ComponentType, type ReactNode } from 'react';

import { createContextBridge } from '../../context-bridge';
import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';

registerMoleculesComponents({
    Portal: GorhomPortal,
});

export const PortalWithoutBridge = getRegisteredComponentWithFallback('Portal', GorhomPortal);

export { PortalHost, PortalProvider } from '@gorhom/portal';

export const { BridgedComponent: Portal, registerContextToBridge: registerPortalContext } =
    createContextBridge<Omit<any, 'children'> & { children: ReactNode }>(
        'portal-context',
        PortalWithoutBridge as ComponentType<any>,
    );
