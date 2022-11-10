import * as React from 'react';
import Color from 'color';

import { useCurrentTheme } from '../hooks';

export function useLatest<T>(value: T) {
    const ref = React.useRef(value);
    ref.current = value;
    return ref;
}

export function useHeaderBackgroundColor() {
    const theme = useCurrentTheme();
    return theme.colors.primary;
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
