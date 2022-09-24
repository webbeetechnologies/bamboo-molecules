import { createContext } from 'react';
import type { PlatformType, ProvidePlatformTypeProps } from './types';

export const PlatformTypeContext = createContext<PlatformType>('android');

export const ProvidePlatformType = ({ platformType, children }: ProvidePlatformTypeProps) => {
    return (
        <PlatformTypeContext.Provider value={platformType}>{children}</PlatformTypeContext.Provider>
    );
};
