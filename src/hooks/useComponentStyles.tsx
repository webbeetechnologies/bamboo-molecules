import { StyleProp, StyleSheet } from 'react-native';
import { useTheme } from './useTheme';
import { useNormalizeStyles } from './useNormalizeStyles';

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

    const componentTheme = theme[componentName];

    return useNormalizeStyles(
        theme.resolveComponentStyles({
            componentTheme,
            variant,
            states,
            size,
            style: StyleSheet.flatten(style),
        }),
        componentName,
    );
};

export default useComponentStyles;
