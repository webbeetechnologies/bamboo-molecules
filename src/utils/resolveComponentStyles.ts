import type { ResolveComponentStylesArgs } from '../core/theme/types';

export const resolveComponentStyles = ({
    componentTheme,
    variant,
    states,
}: ResolveComponentStylesArgs) => {
    const { variants, states: componentStates, ...styles } = componentTheme;

    const variantStyles = variant ? variants[variant] || {} : {};
    const { states: variantStates, ...nonStateStyles } = variantStyles; // filtering the unused state styles

    return {
        ...styles,
        ...nonStateStyles,
        ...flattenStateStyles(states, componentStates),
        ...flattenStateStyles(states, variantStates),
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
