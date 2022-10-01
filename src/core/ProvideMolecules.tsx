import type { ReactNode } from 'react';
import type { StyleProp } from 'react-native';
import type { IExtractThemeFuncArgs } from '@webbee/bamboo-atoms';
import { IComponentsProviderContext, ProvideComponents } from './components';
import { ProvidePlatformType, PlatformType } from './platform';
import { extendTheme, ITheme, ProvideTheme } from './theme';

export type ProvideMoleculesProps = {
    platformType?: PlatformType;
    components?: Partial<IComponentsProviderContext>;
    theme?: ITheme;
    extractTheme?: (args: IExtractThemeFuncArgs) => StyleProp<any>;
    children: ReactNode;
};

const defaultTheme = extendTheme({});

export const ProvideMolecules = ({
    platformType = 'android',
    theme = defaultTheme,
    components = {},
    extractTheme,
    children,
}: ProvideMoleculesProps) => {
    return (
        <ProvidePlatformType platformType={platformType}>
            <ProvideTheme theme={theme} extractTheme={extractTheme}>
                <ProvideComponents components={components}>{children}</ProvideComponents>
            </ProvideTheme>
        </ProvidePlatformType>
    );
};
