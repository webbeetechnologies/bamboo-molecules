import type { ReactNode } from 'react';
import type { StyleProp } from 'react-native';
import type { IExtractThemeFuncArgs } from '@webbee/bamboo-atoms';
import { IComponentsProviderContext, ProvideComponents } from './components';
import { ProvidePlatformType, PlatformType } from './platform';
import { extendTheme, ITheme, ProvideTheme, ResolveComponentStylesArgs } from './theme';

export type ProvideMoleculesProps = {
    platformType?: PlatformType;
    components?: Partial<IComponentsProviderContext>;
    theme?: ITheme;
    extractTheme?: (args: IExtractThemeFuncArgs) => StyleProp<any>;
    resolveComponentStyles?: (args: ResolveComponentStylesArgs) => StyleProp<any>;
    children: ReactNode;
};

const defaultTheme = extendTheme({});

export const ProvideMolecules = ({
    platformType = 'android',
    theme = defaultTheme,
    components = {},
    extractTheme,
    resolveComponentStyles,
    children,
}: ProvideMoleculesProps) => {
    return (
        <ProvidePlatformType platformType={platformType}>
            <ProvideTheme
                theme={theme}
                extractTheme={extractTheme}
                resolveComponentStyles={resolveComponentStyles}>
                <ProvideComponents components={components}>{children}</ProvideComponents>
            </ProvideTheme>
        </ProvidePlatformType>
    );
};
