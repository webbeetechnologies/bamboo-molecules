import {
    ProvideTheme as AtomProvideTheme,
    extendTheme as extendThemeAtoms,
    IExtractStylesFuncArgs,
} from '@webbee/bamboo-atoms';
import merge from 'ts-deepmerge';
import memoize from 'lodash.memoize';

import type { DeepPartial } from '../../types';
import normalizeStyles from '../../utils/normalizeStyles';
import type { ITheme, ProvideThemeArgs } from './types';
import { MD3LightTheme } from './LightTheme';
import { MD3DarkTheme } from './DarkTheme';

const defaultThemeValue: Partial<ITheme> = {
    light: MD3LightTheme,
    dark: MD3DarkTheme,
};

const extractTheme = memoize(({ theme, componentName, colorMode }: IExtractStylesFuncArgs) => {
    return normalizeStyles(theme[componentName], theme[colorMode]);
});

export const ProvideTheme = ({ theme, children }: ProvideThemeArgs) => {
    return (
        <AtomProvideTheme theme={theme} extractStyles={extractTheme}>
            {children}
        </AtomProvideTheme>
    );
};

export const extendTheme = (theme: DeepPartial<ITheme>): ITheme =>
    extendThemeAtoms(merge(defaultThemeValue, theme)) as ITheme;
