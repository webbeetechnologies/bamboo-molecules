import color from 'color';
import { weakMemoized } from './lodash';

export const resolveContrastColor = weakMemoized(
    (bgColor: string, lightColor: string = '#fff', darkColor: string = '#000') => {
        try {
            return color(bgColor).isLight() ? darkColor : lightColor;
        } catch {
            return bgColor;
        }
    },
);

export default color;
