import * as React from 'react';
import Color from 'color';

import { useCurrentTheme } from '../../hooks';

export function useLatest<T>(value: T) {
    const ref = React.useRef(value);
    ref.current = value;
    return ref;
}

export function useHeaderBackgroundColor() {
    const theme = useCurrentTheme();
    return theme.colors.primary;
}

export function useHeaderColorIsLight() {
    const theme = useCurrentTheme();
    const background = theme.colors.primary;
    return Color(background).isLight();
}

export function useHeaderTextColor() {
    const isLight = useHeaderColorIsLight();
    return !isLight ? '#fff' : '#000';
}

export function useTextColorOnPrimary() {
    const theme = useCurrentTheme();
    const isDark = !Color(theme.colors.primary).isLight();
    return isDark ? '#fff' : '#000';
}

export function range(start: number, end: number) {
    return Array(end - start + 1)
        .fill(null)
        .map((_, i) => start + i);
}

export function lightenBy(color: Color, ratio: number) {
    const lightness = color.lightness();
    return color.lightness(lightness + (100 - lightness) * ratio);
}

export function darkenBy(color: Color, ratio: number) {
    const lightness = color.lightness();
    return color.lightness(lightness - lightness * ratio);
}
