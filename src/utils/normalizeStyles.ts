import type { StyleProp } from 'react-native';
import type { MD3Theme, MD3Typescale } from '../core/theme/types';
import { allArgumentResolver, createMemoizedFunction, get } from './lodash';

export const maybeIsToken = (value: any) => typeof value === 'string' && value.includes('.');

const normalizeStylesMemo = createMemoizedFunction({
    /**
     *
     * @param styles the style object to normalize
     * @param currentTheme for switching between themes
     * @param cacheKey to resolve unique values for different components
     */
    resolver: (
        styles: StyleProp<any> | StyleProp<any>[],
        { themeName }: MD3Theme,
        cacheKey: string,
    ) => `${cacheKey}_${themeName}_${allArgumentResolver(styles)}`,
});

const flattenTypescale = (style: Partial<Record<string, any> & { typescale: MD3Typescale }>) => {
    if ('typescale' in style) {
        const { typescale = {}, ...rest } = style;
        style = { ...rest, ...typescale };
    }

    return style;
};

// normalize tokens inside the styles object and the subsequent objects inside it
const normalizeStyles = normalizeStylesMemo(
    /**
     *
     * @param styles the style object to normalize
     * @param currentTheme for switching between themes
     * @param cacheKey to resolve unique values for different components
     */
    (styles: StyleProp<any> | StyleProp<any>[], currentTheme: MD3Theme, cacheKey: string) => {
        // if the styles is an array, we want to normalize each entry
        if (Array.isArray(styles)) {
            return styles.map(styleObj => normalizeStyles(styleObj, currentTheme, cacheKey));
        }

        if (!styles) {
            return undefined;
        }

        const newStyles = Object.assign({}, styles);

        const normalizableProperties = [];
        for (const key in styles) {
            if (maybeIsToken(styles[key]) || typeof styles[key] === 'object') {
                normalizableProperties.push(key);
            }
        }

        normalizableProperties.forEach(key => {
            if (typeof newStyles[key] === 'string') {
                newStyles[key] = get(currentTheme, newStyles[key], '');
            } else {
                // it's an object // we want to normalize everything inside it as well
                newStyles[key] = normalizeStyles(newStyles[key], currentTheme, cacheKey);
            }
        });

        return flattenTypescale(newStyles);
    },
);

export default normalizeStyles;
