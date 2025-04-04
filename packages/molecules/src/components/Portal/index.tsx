import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import { createContextBridge } from '../../context-bridge';
import { Portal as GorhomPortal } from '@gorhom/portal';
import type { PortalProps } from '@gorhom/portal/lib/typescript/components/portal/types';
import type { ComponentType, ReactNode } from 'react';

registerMoleculesComponents({
    Portal: GorhomPortal,
});

export const PortalWithoutBridge = getRegisteredMoleculesComponent('Portal') ?? GorhomPortal;

export { PortalHost, PortalProvider } from '@gorhom/portal';

export const { BridgedComponent: Portal, registerContextToBridge: registerPortalContext } =
    createContextBridge<Omit<PortalProps, 'children'> & { children: ReactNode }>(
        'portal-context',
        PortalWithoutBridge as ComponentType<any>,
    );
