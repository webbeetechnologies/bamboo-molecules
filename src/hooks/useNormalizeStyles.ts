import { normalizeStyles } from '../utils';
import type { StyleProp } from 'react-native';
import { useColorMode, useTheme } from './index';
import type { ITheme } from '../core';
import { useId, useMemo } from 'react';
export const useNormalizeStyles = (
    style: StyleProp<any> | StyleProp<any>[] = null,
    cacheKey?: string,
) => {
    const { colorMode } = useColorMode();
    const theme = useTheme<ITheme>();
    const currentTheme = theme[colorMode as string];

    const uniqueId = useId();

    cacheKey = cacheKey ?? uniqueId;
    return useMemo(
        () => normalizeStyles(style, currentTheme, cacheKey),
        [style, currentTheme, cacheKey],
    );
};
