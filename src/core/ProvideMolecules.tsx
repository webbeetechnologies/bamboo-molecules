import type { ReactNode } from 'react';
import type { StyleProp } from 'react-native';
import type { IExtractStylesFuncArgs } from '@bambooapp/bamboo-atoms';
import { IComponentsProviderContext, ProvideComponents } from './components';
import { ProvidePlatformType, PlatformType } from './platform';
import { extendTheme, ITheme, ProvideTheme, ResolveComponentStylesArgs } from './theme';
import { PortalHost } from '../components';

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
                    <ProvidePortal>{children}</ProvidePortal>
                </ProvideComponents>
            </ProvideTheme>
        </ProvidePlatformType>
    );
};

export type ProvidePortalProps = {
    children: ReactNode;
};

export const ProvidePortal = ({ children }: ProvidePortalProps) => {
    return <PortalHost>{children}</PortalHost>;
};

export const ProvideMoleculesWithoutPortal = ({
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
                <ProvideComponents components={components}>{children}</ProvideComponents>
            </ProvideTheme>
        </ProvidePlatformType>
    );
};

export default ProvideMolecules;
