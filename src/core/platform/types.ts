import type { ReactNode } from 'react';

export type PlatformType = 'android' | 'ios';

export type ProvidePlatformTypeProps = {
    platformType: PlatformType;
    children: ReactNode;
};
