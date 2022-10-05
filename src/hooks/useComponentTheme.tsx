import { useMemo } from 'react';
import { useColorMode } from '@webbee/bamboo-atoms';
import { useTheme } from './';
import type { ITheme } from '../core';
import normalizeStyles from '../utils/normalizeStyles';
import type { StyleProp } from 'react-native';

const useComponentTheme = (
    componentName: string,
    resolvers?: {
        variant?: string;
        states?: { [key: string]: boolean };
    },
) => {
    const { variant, states } = resolvers || {};
    const theme = useTheme<ITheme>();
    const colorMode = useColorMode();
    const componentTheme = useMemo(
        () => normalizeStyles(theme[componentName], theme[colorMode]),
        [theme, componentName, colorMode],
    );

    return useMemo(
        () => resolveComponentStyles(componentTheme, variant, states),
        [componentTheme, states, variant],
    );
};

const resolveComponentStyles = (
    componentTheme: StyleProp<any>,
    variant?: string,
    states?: { [key: string]: boolean },
) => {
    const { variants, ...styles } = componentTheme;

    const variantStyles = variant ? variants[variant] || {} : {};
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { states: _states, ...nonStateStyles } = variantStyles; // filtering the unused state styles

    let componentStyles = { ...styles, ...nonStateStyles };

    if (states) {
        Object.keys(states).forEach(key => {
            if (states[key]) {
                componentStyles = { ...componentStyles, ...variantStyles[key] };
            }
        });
    }

    return componentStyles;
};

export default useComponentTheme;
