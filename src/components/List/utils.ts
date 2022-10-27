import type { TextStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from 'src/types';

export type ListStyles = {
    titleColor?: string;
    descriptionColor?: string;
};

type States = 'disabled' | 'hovered' | 'focused' | 'pressed';

export const defaultStyles: ComponentStylePropWithVariants<TextStyle, States, ListStyles> = {
    titleColor: 'colors.onSurface',
    descriptionColor: 'colors.onSurfaceVariants',
    states: {
        disabled: {
            titleColor: 'colors.surfaceDisabled',
            descriptionColor: 'colors.surfaceDisabled',
        },
        hovered: {
            titleColor: 'colors.surfaceDisabled',
        },
        focused: {
            titleColor: 'colors.onSurface',
        },
        pressed: {
            titleColor: 'colors.surfaceDisabled',
        },
    },
};

export const flatListStyles: ComponentStylePropWithVariants<TextStyle> = {};
