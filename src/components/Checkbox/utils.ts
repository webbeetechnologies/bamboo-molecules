import type { TextStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type States = 'disabled' | 'checked';
type CustomProps = {
    color?: string;
    uncheckedColor?: string;
    animationScale?: string;
    animationDuration?: string;
    size?: string;
    labelColor?: string;
    labelTypeScale?: string;
    checkboxPadding?: string; // don't want to mix up with the padding from style prop
};

export const defaultStyles: ComponentStylePropWithVariants<TextStyle, States, CustomProps> = {
    color: 'colors.onSurfaceVariant',
    uncheckedColor: 'colors.onSurfaceVariant',
    animationScale: 'animation.scale',
    animationDuration: 'animation.durations.1',
    size: 'sizes.6',
    labelColor: 'colors.onSurface',
    labelTypeScale: 'typescale.bodyLarge',

    checkboxPadding: 'spacings.1l',

    states: {
        checked: {
            color: 'colors.primary',
        },
        disabled: {
            color: 'colors.onSurfaceDisabled',
            uncheckedColor: 'colors.onSurfaceDisabled',
            labelColor: 'colors.onSurfaceDisabled',
        },
    },
};
