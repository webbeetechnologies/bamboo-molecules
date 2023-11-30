import { StyleProp, StyleSheet } from 'react-native';
import { useTheme } from './useTheme';
import { useNormalizeStyles } from './useNormalizeStyles';
import { useEffect, useMemo, useRef } from 'react';
import { shallowCompare } from '../utils';

const defaultStyleObject = {};

/*
 * resolvers help resolve the component styles
 * if the variant is defined, the hook will look for the styles of the variant under the variants property
 * if the states is defined, the hook will look for state styles in highest level of the component theme or inside the individual variants
 * only one state can be active and the first one in the states object gets the highest priority
 * */
const useComponentStyles = (
    componentName: string,
    style: StyleProp<any> | StyleProp<any>[] = defaultStyleObject,
    resolvers?: {
        variant?: string;
        states?: { [key: string]: boolean };
        size?: string;
    },
) => {
    const { variant, states, size } = resolvers || {};
    const theme = useTheme<ITheme>();
    const styleRef = useRef(null);
    const statesRef = useRef(states);

    const memoizedStyle = useMemo(() => {
        const flattenedStyles = StyleSheet.flatten(style);
        if (!shallowCompare(styleRef.current, flattenedStyles)) styleRef.current = flattenedStyles;
        return styleRef.current;
    }, [style]);

    const memoizedStates = useMemo(() => {
        if (!shallowCompare(statesRef.current, states)) statesRef.current = states;
        return statesRef.current;
    }, [states]);

    const componentTheme = theme[componentName];

    const hasTheme = !!componentTheme;
    useEffect(() => {
        if (hasTheme) return;
        console.warn(`"${componentName}" theme not found`);
    }, [componentName, hasTheme]);

    return useNormalizeStyles(
        useMemo(
            () =>
                theme.resolveComponentStyles({
                    componentTheme,
                    variant,
                    states: memoizedStates,
                    size,
                    style: memoizedStyle,
                }),
            [theme, componentTheme, variant, memoizedStates, size, memoizedStyle],
        ),
        componentName,
    );
};

export default useComponentStyles;
