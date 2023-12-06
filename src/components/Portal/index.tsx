import { createContextBridge } from '@bambooapp/bamboo-molecules/context-bridge';
import { Portal as GorhomPortal } from '@gorhom/portal';
export { PortalHost, PortalProvider } from '@gorhom/portal';

export const { BridgedComponent: Portal, registerContextToBridge: registerPortalContext } =
    createContextBridge('portal-context', GorhomPortal);
