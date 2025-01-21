import { useEffect, useMemo } from 'react';
import { ProvideTheme as AtomProvideTheme, IExtractStylesFuncArgs } from '@bambooapp/bamboo-atoms';
import { usePrevious } from '../../hooks';
import {
    normalizeStyles,
    resolveComponentStyles as defaultResolveComponentStyles,
    clearStylesCache,
    memoize,
} from '../../utils';
import type { ProvideThemeArgs } from './types';

export const defaultExtractStyles = memoize(
    ({ theme, componentName, colorMode, style }: IExtractStylesFuncArgs) => {
        const normalizedComponentStyles = normalizeStyles(
            theme[componentName],
            theme[colorMode],
            `${componentName}`,
        );
        const normalizedStyleProp = normalizeStyles(style, theme[colorMode], `${componentName}`);

        return { ...normalizedComponentStyles, ...normalizedStyleProp };
    },
);

const defaultOverwritableProperties = ['light', 'dark'];

export const ProvideTheme = ({
    theme,
    resolveComponentStyles = defaultResolveComponentStyles,
    extractStyles = defaultExtractStyles,
    children,
    overwritableProperties = defaultOverwritableProperties,
}: ProvideThemeArgs) => {
    const memoizedTheme = useMemo(
        () => ({
            ...theme,
            resolveComponentStyles,
        }),
        [resolveComponentStyles, theme],
    );

    const memoizedThemeRef = usePrevious(memoizedTheme);

    useEffect(
        () => () => {
            // When theme changes burst cache
            if (memoizedThemeRef.current === memoizedTheme) return;
            clearStylesCache();
        },
        [memoizedTheme, memoizedThemeRef],
    );

    return (
        <AtomProvideTheme
            theme={memoizedTheme}
            extractStyles={extractStyles}
            overwritableProperties={overwritableProperties}>
            {children}
        </AtomProvideTheme>
    );
};
