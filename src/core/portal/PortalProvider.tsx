import { createContext, useContext, FC, PropsWithChildren } from 'react';
import { PortalProvider as OverlayPortalProvider } from '@react-native-aria/overlays';

const PortalContext = createContext(false);
export const PortalProvider: FC<PropsWithChildren> = ({ children }) => {
    const hasPortal = useContext(PortalContext);

    return hasPortal ? (
        <>{children}</>
    ) : (
        <PortalContext.Provider value={true}>
            <OverlayPortalProvider>{children}</OverlayPortalProvider>
        </PortalContext.Provider>
    );
};
