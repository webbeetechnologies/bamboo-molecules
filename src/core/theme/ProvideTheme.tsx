import { useMemo } from 'react';
import {
    ProvideTheme as AtomProvideTheme,
    extendTheme as extendThemeAtoms,
    IExtractStylesFuncArgs,
} from '@webbee/bamboo-atoms';
import merge from 'ts-deepmerge';
import memoize from 'lodash.memoize';

import {
    activityIndicatorStyles,
    buttonStyles,
    horizontalDividerStyles,
    iconStyles,
    iconButtonStyles,
    touchableRippleStyles,
    surfaceStyles,
    switchStyles,
    verticalDividerStyles,
    checkboxStyles,
} from '../../components';
import { MD3LightTheme, MD3DarkTheme } from '../../styles';
import type { DeepPartial } from '../../types';
import {
    normalizeStyles,
    resolveComponentStyles as defaultResolveComponentStyles,
} from '../../utils';
import type { ITheme, ProvideThemeArgs } from './types';

const defaultThemeValue: Partial<ITheme> = {
    light: MD3LightTheme,
    dark: MD3DarkTheme,
    ActivityIndicator: activityIndicatorStyles,
    Button: buttonStyles,
    HorizontalDivider: horizontalDividerStyles,
    Icon: iconStyles,
    IconButton: iconButtonStyles,
    VerticalDivider: verticalDividerStyles,
    TouchableRipple: touchableRippleStyles,
    Surface: surfaceStyles,
    Switch: switchStyles,
    Checkbox: checkboxStyles,
};

const defaultExtractStyles = memoize(
    ({ theme, componentName, colorMode, style }: IExtractStylesFuncArgs) => {
        const normalizedComponentStyles = normalizeStyles(theme[componentName], theme[colorMode]);
        const normalizedStyleProp = normalizeStyles(style, theme[colorMode]);

        return { ...normalizedComponentStyles, ...normalizedStyleProp };
    },
);

export const ProvideTheme = ({
    theme,
    resolveComponentStyles = defaultResolveComponentStyles,
    extractStyles = defaultExtractStyles,
    children,
}: ProvideThemeArgs) => {
    const memoizedTheme = useMemo(
        () => ({
            ...theme,
            resolveComponentStyles,
        }),
        [resolveComponentStyles, theme],
    );

    return (
        <AtomProvideTheme theme={memoizedTheme} extractStyles={extractStyles}>
            {children}
        </AtomProvideTheme>
    );
};

export const extendTheme = (theme: DeepPartial<ITheme>): ITheme =>
    extendThemeAtoms(merge(defaultThemeValue, theme)) as ITheme;
