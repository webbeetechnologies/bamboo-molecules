import { useMemo } from 'react';
import { useColorMode } from '@webbee/bamboo-atoms';
import { useTheme } from './';
import type { ITheme } from '../core';
import normalizeStyles from '../utils/normalizeStyles';

const useComponentTheme = (componentName: string) => {
    const theme = useTheme<ITheme>();
    const colorMode = useColorMode();

    return useMemo(
        () => normalizeStyles(theme[componentName], theme[colorMode]),
        [theme, componentName, colorMode],
    );
};

export default useComponentTheme;
