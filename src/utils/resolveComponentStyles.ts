import type { ResolveComponentStylesArgs } from '../core/theme/types';
import type { ComponentSize } from '../types';

export const resolveComponentStyles = ({
    componentTheme,
    variant,
    states,
    size,
    style, // style prop from the component
}: ResolveComponentStylesArgs) => {
    const { variants, states: componentStates, sizes: componentSizes, ...styles } = componentTheme;

    const variantStyles = variant ? variants[variant] || {} : {};
    const { states: variantStates, sizes: variantSizes, ...nonStateStyles } = variantStyles; // filtering the unused state styles

    return {
        ...styles,
        ...nonStateStyles,
        ...flattenStateStyles(states, componentStates),
        ...flattenStateStyles(states, variantStates),
        ...resolveSizeStyles(size, componentSizes),
        ...resolveSizeStyles(size, variantSizes),
        ...style, // style prop will always get the highest priority
    };
};

export const flattenStateStyles = (
    states: { [key: string]: boolean } | undefined,
    statesStyles: Record<string, any>,
) => {
    let flattenedStyles = {};

    if (states && statesStyles) {
        const firstActiveState = Object.keys(states).find(key => states[key]) || '';

        flattenedStyles = { ...flattenedStyles, ...(statesStyles[firstActiveState] || {}) };
    }

    return flattenedStyles;
};

export const resolveSizeStyles = (
    size: string | undefined,
    componentSizes: Record<string, ComponentSize>,
) => {
    return size ? componentSizes[size] || {} : {};
};
