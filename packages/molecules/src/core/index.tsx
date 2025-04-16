import { ReactNode } from 'react';

// export { PortalProvider } from '@gorhom/portal';
export const PortalProvider = ({ children }: { children: ReactNode }) => <>{children}</>;
export * from './componentsRegistry';
