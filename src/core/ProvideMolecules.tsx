import type { ReactNode } from 'react';
import type { StyleProp } from 'react-native';
import type { IExtractStylesFuncArgs } from '@bambooapp/bamboo-atoms';
import { IComponentsProviderContext, ProvideComponents } from './components';
import { ProvidePlatformType, PlatformType } from './platform';
import { extendTheme, ITheme, ProvideTheme, ResolveComponentStylesArgs } from './theme';
import { PortalHost } from '../components';
import { PortalProvider } from './portal';

export type ProvideMoleculesProps = {
    platformType?: PlatformType;
    components?: Partial<IComponentsProviderContext>;
    theme?: ITheme;
    extractStyles?: (args: IExtractStylesFuncArgs) => StyleProp<any>;
    resolveComponentStyles?: (args: ResolveComponentStylesArgs) => StyleProp<any>;
    children: ReactNode;
};

const defaultTheme = extendTheme({});

export const ProvideMolecules = ({
    platformType = 'android',
    theme = defaultTheme,
    components = {},
    extractStyles,
    resolveComponentStyles,
    children,
}: ProvideMoleculesProps) => {
    return (
        <ProvidePlatformType platformType={platformType}>
            <ProvideTheme
                theme={theme}
                extractStyles={extractStyles}
                resolveComponentStyles={resolveComponentStyles}>
                <ProvideComponents components={components}>
                    <PortalProvider>
                        <PortalHost>{children}</PortalHost>
                    </PortalProvider>
                </ProvideComponents>
            </ProvideTheme>
        </ProvidePlatformType>
    );
};

export default ProvideMolecules;
