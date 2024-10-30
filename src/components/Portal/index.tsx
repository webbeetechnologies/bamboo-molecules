import { createContextBridge } from '@bambooapp/bamboo-molecules/context-bridge';
import { Portal as GorhomPortal } from '@gorhom/portal';
import type { PortalProps } from '@gorhom/portal/lib/typescript/components/portal/types';
import type { ReactNode } from 'react';
export { PortalHost, PortalProvider } from '@gorhom/portal';

export const { BridgedComponent: Portal, registerContextToBridge: registerPortalContext } =
    createContextBridge<Omit<PortalProps, 'children'> & { children: ReactNode }>(
        'portal-context',
        GorhomPortal,
    );
