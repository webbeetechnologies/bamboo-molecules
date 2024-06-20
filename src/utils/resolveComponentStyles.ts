import deepmerge from 'ts-deepmerge';
import type { ResolveComponentStylesArgs } from '../core/theme/types';
import type { ComponentSize } from '../types';
import { createMemoizedFunction } from './lodash';

const resolveComponentStylesMemo = createMemoizedFunction();

const emptyObj = {};

export const resolveComponentStyles = resolveComponentStylesMemo(
    ({
        componentTheme,
        variant,
        states,
        size,
        style = emptyObj, // style prop from the component
    }: ResolveComponentStylesArgs) => {
        const {
            variants,
            states: componentStates = emptyObj,
            sizes: componentSizes = emptyObj,
            ...styles
        } = componentTheme ?? emptyObj;

        const variantStyles = variant ? variants?.[variant] || emptyObj : emptyObj;
        const {
            states: variantStates = emptyObj,
            sizes: variantSizes = emptyObj,
            ...nonStateStyles
        } = variantStyles; // filtering the unused state styles

        return deepmerge(
            styles,
            nonStateStyles,
            flattenStateStyles(states, componentStates),
            flattenStateStyles(states, variantStates),
            resolveSizeStyles(size, componentSizes),
            resolveSizeStyles(size, variantSizes),
            style,
        );
    },
);

export const flattenStateStyles = (
    states: { [key: string]: boolean } | undefined,
    statesStyles: Record<string, any>,
) => {
    let flattenedStyles = {};

    if (states && statesStyles) {
        const firstActiveState =
            Object.keys(states).find(key => states[key] && key in statesStyles) || '';

        flattenedStyles = { ...flattenedStyles, ...(statesStyles[firstActiveState] || {}) };
    }

    return flattenedStyles;
};

export const resolveSizeStyles = (
    size: string | undefined,
    componentSizes: Record<string, ComponentSize> | undefined,
) => {
    return size && componentSizes ? componentSizes[size] || {} : {};
};
