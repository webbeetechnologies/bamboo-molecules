import deepmerge from 'ts-deepmerge';
import { LRUCache } from 'lru-cache';
import type { ResolveComponentStylesArgs } from '../core/theme/types';
import type { ComponentSize } from '../types';

type CacheKey = string;
type CacheValue = any;

export const resolveComponentStylesCache = new LRUCache<CacheKey, CacheValue>({
    max: 500,
});

const emptyObj = {};

export const resolveComponentStyles = (args: ResolveComponentStylesArgs): any => {
    // Generate a unique cache key based on the arguments
    const cacheKey = generateCacheKey(args);

    // Check if the result is in the cache
    if (resolveComponentStylesCache.has(cacheKey)) {
        return resolveComponentStylesCache.get(cacheKey);
    }

    // Compute the styles
    const result = computeComponentStyles(args);

    // Store the result in the cache
    resolveComponentStylesCache.set(cacheKey, result);

    return result;
};

// Helper function to generate a cache key
const generateCacheKey = (args: ResolveComponentStylesArgs): string => {
    const sortObjectKeys = (obj: any): any => {
        if (Array.isArray(obj)) {
            return obj.map(sortObjectKeys);
        } else if (obj !== null && typeof obj === 'object') {
            return Object.keys(obj)
                .sort()
                .reduce((result, key) => {
                    result[key] = sortObjectKeys(obj[key]);
                    return result;
                }, {} as any);
        } else {
            return obj;
        }
    };

    const sortedArgs = sortObjectKeys(args);
    return JSON.stringify(sortedArgs);
};

// Function to compute the component styles
const computeComponentStyles = ({
    componentTheme,
    variant,
    states,
    size,
    style = emptyObj,
}: ResolveComponentStylesArgs): any => {
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
    } = variantStyles; // filtering unused state styles

    return deepmerge(
        styles,
        nonStateStyles,
        flattenStateStyles(states, componentStates),
        flattenStateStyles(states, variantStates),
        resolveSizeStyles(size, componentSizes),
        resolveSizeStyles(size, variantSizes),
        style,
    );
};

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
