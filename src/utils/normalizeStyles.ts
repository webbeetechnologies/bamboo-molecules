import type { StyleProp } from 'react-native';
import type { MD3Theme, MD3Typescale } from '../core/theme/types';
import { get, allArgumentResolver } from './lodash'; // Assuming you have a `get` utility function

import { LRUCache } from 'lru-cache';

export const normalizeStylesCache = new LRUCache({
    max: 500,
});

export const maybeIsToken = (value: any) => typeof value === 'string' && value.includes('.');

const flattenTypescale = (style: Partial<Record<string, any> & { typescale: MD3Typescale }>) => {
    if ('typescale' in style) {
        const { typescale = {}, ...rest } = style;
        style = { ...rest, ...typescale };
    }
    return style;
};

// normalize tokens inside the styles object and the subsequent objects inside it
/**
 *
 * @param styles the style object to normalize
 * @param currentTheme for switching between themes
 * @param cacheKey to resolve unique values for different components
 */
function normalizeStyles(
    styles: StyleProp<any> | StyleProp<any>[],
    currentTheme: MD3Theme,
    _cacheKey: string,
): any {
    // Generate a unique cache key
    const cacheKey = `${_cacheKey}_${currentTheme.themeName}_${allArgumentResolver(styles)}`;

    // Check if the result is cached
    if (normalizeStylesCache.has(cacheKey)) {
        return normalizeStylesCache.get(cacheKey);
    }

    // Proceed to normalize styles
    let normalizedStyles;
    if (Array.isArray(styles)) {
        // if the styles is an array, we want to normalize each entry
        normalizedStyles = styles.map(styleObj =>
            normalizeStyles(styleObj, currentTheme, cacheKey),
        );
    } else if (!styles) {
        normalizedStyles = undefined;
    } else {
        const newStyles = { ...styles };

        for (const [key, value] of Object.entries(newStyles)) {
            if (maybeIsToken(value)) {
                // Replace token with actual value from theme
                newStyles[key] = get(currentTheme, value as string, '');
            } else if (typeof value === 'object' && value !== null) {
                // it's an object // we want to normalize everything inside it as well
                newStyles[key] = normalizeStyles(value, currentTheme, cacheKey);
            }
            // Primitive values (numbers, booleans, etc.) are left as is
        }

        normalizedStyles = flattenTypescale(newStyles);
    }

    // Cache the result
    normalizeStylesCache.set(cacheKey, normalizedStyles);

    return normalizedStyles;
}

export default normalizeStyles;
