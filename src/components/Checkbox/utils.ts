import { TextStyle, ViewStyle, StyleSheet } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type States = 'disabled' | 'checked' | 'hovered' | 'checkedAndHovered';
type CustomProps = {
    color?: string;
    uncheckedColor?: string;
    animationScale?: string;
    animationDuration?: string;
    labelColor?: string;
    labelTypeScale?: string;
    stateLayer?: ViewStyle;
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
        checkedAndHovered: {
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
            animationScale: 'animation.scale',

            stateLayer: {
                ...StyleSheet.absoluteFillObject,
                backgroundColor: 'transparent',
                zIndex: -1,
            },

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

            states: {
                hovered: {
                    stateLayer: {
                        backgroundColor: 'colors.stateLayer.hover.onSurface',
                    },
                },

                checkedAndHovered: {
                    stateLayer: {
                        backgroundColor: 'colors.stateLayer.hover.primary',
                    },
                },
            },
        },
        item: {
            labelColor: 'colors.onSurface',

            sizes: {
                sm: {
                    labelTypeScale: 'typescale.bodyMedium',
                },
                md: {
                    labelTypeScale: 'typescale.bodyLarge',
                },
                lg: {
                    labelTypeScale: 'typescale.bodyLarge',
                    fontSize: 'fontSizes.lg',
                },
            },
        },
    },
};
