import type { TextStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from 'src/types';

export type ListStyles = {
    titleStyle?: object | string | number;
    descriptionStyle?: object | string | number;
};

type States = 'disabled' | 'hovered' | 'focused' | 'pressed';

export const defaultStyles: ComponentStylePropWithVariants<TextStyle, States, ListStyles> = {
    color: 'colors.surface',
    titleStyle: { color: 'colors.onSurface' },
    descriptionStyle: { color: 'colors.onSurfaceVariants' },
    states: {
        disabled: {
            titleStyle: {
                color: 'colors.surfaceDisabled',
            },
            descriptionStyle: {
                color: 'colors.surfaceDisabled',
            },
        },
        hovered: {
            titleStyle: {
                color: 'colors.surfaceDisabled',
            },
        },
        focused: {
            titleStyle: {
                color: 'colors.onSurface',
            },
        },
        pressed: {
            titleStyle: {
                color: 'colors.surfaceDisabled',
            },
        },
    },
};

export const flatListStyles: ComponentStylePropWithVariants<TextStyle> = {};
