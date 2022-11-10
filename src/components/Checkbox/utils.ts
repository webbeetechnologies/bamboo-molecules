import type { TextStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type States = 'disabled' | 'checked';
type CustomProps = {
    color?: string;
    uncheckedColor?: string;
    animationScale?: string;
    animationDuration?: string;
    labelColor?: string;
    labelTypeScale?: string;
};

type CustomSizeProps = {
    iconSize?: number | string;
    labelTypeScale?: number | string;
};

export const defaultStyles: ComponentStylePropWithVariants<
    TextStyle,
    States,
    CustomProps,
    CustomSizeProps
> = {
    color: 'colors.onSurfaceVariant',
    uncheckedColor: 'colors.onSurfaceVariant',
    animationScale: 'animation.scale',
    animationDuration: 'animation.durations.1',

    sizes: {
        sm: {
            padding: 6,
            borderRadius: 16,
            iconSize: 20,
        },
        md: {
            padding: 6,
            borderRadius: 18,
            iconSize: 24,
        },
        lg: {
            padding: 6,
            borderRadius: 20,
            iconSize: 28,
        },
    },

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

    variants: {
        ios: {
            sizes: {},
        },
        android: {
            // we only want to width and height in android
            sizes: {
                sm: {
                    width: 32,
                    height: 32,
                },
                md: {
                    width: 36,
                    height: 36,
                },
                lg: {
                    width: 40,
                    height: 40,
                },
            },
        },
        item: {
            labelColor: 'colors.onSurface',

            sizes: {
                sm: {
                    paddingVertical: 'spacings.1',
                    paddingHorizontal: 'spacings.4',
                    labelTypeScale: 'typescale.bodyMedium',
                },
                md: {
                    paddingVertical: 'spacings.2',
                    paddingHorizontal: 'spacings.4',
                    labelTypeScale: 'typescale.bodyLarge',
                },
                lg: {
                    paddingVertical: 'spacings.3',
                    paddingHorizontal: 'spacings.4',
                    labelTypeScale: 'typescale.bodyLarge',
                    fontSize: 'fontSizes.lg',
                },
            },
        },
    },
};
