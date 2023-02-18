import type { StyleProp } from 'react-native';
import type { MD3Theme } from '../core/theme/types';
import { createMemoizedFunction, get } from './lodash';

const normalizeStylesMemo = createMemoizedFunction();

// normalize tokens inside the styles object and the subsequent objects inside it
const normalizeStyles: StyleProp<any> | StyleProp<any>[] = normalizeStylesMemo(
    (styles: StyleProp<any> | StyleProp<any>[], currentTheme: MD3Theme) => {
        // if the styles is an array, we want to normalize each entries
        if (Array.isArray(styles)) {
            return styles.map(styleObj => normalizeStyles(styleObj, currentTheme));
        }

        const newStyles = Object.assign({}, styles);
        const normalizableProperties = Object.keys(newStyles).filter(
            key =>
                (typeof newStyles[key] === 'string' && newStyles[key].includes('.')) ||
                typeof newStyles[key] === 'object',
        );

        normalizableProperties.forEach(key => {
            if (typeof newStyles[key] === 'string') {
                newStyles[key] = get(currentTheme, newStyles[key], '');
            } else {
                // it's an object // we want to normalize everything inside it as well
                newStyles[key] = normalizeStyles(newStyles[key], currentTheme);
            }
        });

        return newStyles;
    },
);

export const clearStylesCache = () => normalizeStyles.cache.clear();
export default normalizeStyles;
