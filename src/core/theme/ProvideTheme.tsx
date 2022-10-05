import {
    ProvideTheme as AtomProvideTheme,
    extendTheme as extendThemeAtoms,
    IExtractThemeFuncArgs,
} from '@webbee/bamboo-atoms';
import merge from 'ts-deepmerge';
import memoize from 'lodash.memoize';

import {
    buttonStyles,
    horizontalDividerStyles,
    touchableRippleStyles,
    switchStyles,
    verticalDividerStyles,
} from '../../components';
import { MD3LightTheme, MD3DarkTheme } from '../../styles';
import type { DeepPartial } from '../../types';
import normalizeStyles from '../../utils/normalizeStyles';
import type { ITheme, ProvideThemeArgs } from './types';

const defaultThemeValue: Partial<ITheme> = {
    light: MD3LightTheme,
    dark: MD3DarkTheme,
    Button: buttonStyles,
    HorizontalDivider: horizontalDividerStyles,
    VerticalDivider: verticalDividerStyles,
    TouchableRipple: touchableRippleStyles,
    Switch: switchStyles,
};

const defaultExtractTheme = memoize(
    ({ theme, componentName, colorMode }: IExtractThemeFuncArgs) => {
        return normalizeStyles(theme[componentName], theme[colorMode]);
    },
);

export const ProvideTheme = ({
    theme,
    extractTheme = defaultExtractTheme,
    children,
}: ProvideThemeArgs) => {
    return (
        <AtomProvideTheme theme={theme} extractTheme={extractTheme}>
            {children}
        </AtomProvideTheme>
    );
};

export const extendTheme = (theme: DeepPartial<ITheme>): ITheme =>
    extendThemeAtoms(merge(defaultThemeValue, theme)) as ITheme;
