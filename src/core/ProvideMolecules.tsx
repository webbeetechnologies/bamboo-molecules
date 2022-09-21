import type { ReactNode } from 'react';
import { IComponentsProviderContext, ProvideComponents } from './components';
import { ProvidePlatformType, PlatformType } from './platform';

export type ProvideMoleculesProps = {
    platformType?: PlatformType;
    components?: Partial<IComponentsProviderContext>;
    // theme: ITheme
    children: ReactNode;
};

export const ProvideMolecules = ({
    platformType = 'android',
    components = {},
    children,
}: ProvideMoleculesProps) => {
    return (
        <ProvidePlatformType platformType={platformType}>
            <ProvideComponents components={components}>{children}</ProvideComponents>
        </ProvidePlatformType>
    );
};
