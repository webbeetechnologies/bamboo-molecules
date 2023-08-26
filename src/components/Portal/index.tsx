import { createContextBridge } from '../../core/ContextBridge';
import { Portal as GorhomPortal } from '@gorhom/portal';
export { PortalHost, PortalProvider } from '@gorhom/portal';

export const Portal = createContextBridge([], GorhomPortal);
