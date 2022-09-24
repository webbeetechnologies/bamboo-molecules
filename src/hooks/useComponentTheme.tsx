import { useMemo } from 'react';
import { Appearance } from 'react-native';
import { useTheme } from './';
import type { ITheme } from '../core';
import normalizeStyles from '../utils/normalizeStyles';

const useComponentTheme = (componentName: string) => {
    const theme = useTheme<ITheme>();
    const colorMode =
        theme.colorMode === 'auto' ? Appearance.getColorScheme() || 'light' : theme.colorMode;

    return useMemo(
        () => normalizeStyles(theme[componentName], theme[colorMode]),
        [theme, componentName, colorMode],
    );
};

export default useComponentTheme;
