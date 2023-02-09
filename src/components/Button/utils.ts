import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type CustomProps = {
    animationScale?: string; // because it's a design token
    button?: ViewStyle;
    content?: ViewStyle;
    icon?: ViewStyle;
    iconTextMode?: ViewStyle;
    label?: TextStyle;
    labelText?: TextStyle;
    labelTextAddons?: TextStyle;
};

type CustomSizeProps = {
    iconSize?: string | number;
    typeScale?: string | number; // because it's a design token
};

export const defaultStyles: ComponentStylePropWithVariants<
    TextStyle,
    'disabled' | 'hovered',
    CustomProps,
    CustomSizeProps
> = {
    animationScale: 'animation.scale',
    flexGrow: 1,

    button: {
        borderStyle: 'solid',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
    },
    icon: {
        marginLeft: 'spacings.4',
        marginRight: 'spacings._4',
    },
    iconTextMode: {
        marginLeft: 'spacings.3',
        marginRight: 'spacings._2',
    },
    label: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        marginVertical: 'spacings.2l',
        marginHorizontal: 'spacings.6',
    },
    labelText: {
        marginHorizontal: 'spacings.3',
    },
    labelTextAddons: {
        marginHorizontal: 'spacings.4',
    },

    sizes: {
        sm: {
            minWidth: 64,
            iconSize: 22,
            borderRadius: 'shapes.corner.full',
            typeScale: 'typescale.labelMedium',
        },
        md: {
            minWidth: 64,
            iconSize: 24,
            borderRadius: 'shapes.corner.full',
            typeScale: 'typescale.labelLarge',
        },
        lg: {
            minWidth: 64,
            iconSize: 26,
            borderRadius: 'shapes.corner.full',
            typeScale: 'typescale.labelLarge',
            fontSize: 'fontSizes.md',
        },
    },

    states: {
        disabled: {
            color: 'colors.onSurfaceDisabled',
        },
    },
    variants: {
        outlined: {
            backgroundColor: 'transparent',
            color: 'colors.primary',
            borderColor: 'colors.outline',
            borderWidth: 1,

            states: {
                disabled: {
                    color: 'colors.stateLayer.disabled.onSurface_Level4',
                    borderColor: 'colors.stateLayer.disabled.onSurface',
                },
                hovered: {
                    backgroundColor: 'colors.primaryContainerOnHover',
                },
            },
        },
        text: {
            backgroundColor: 'transparent',
            color: 'colors.primary',

            states: {
                disabled: {
                    color: 'colors.stateLayer.disabled.onSurface_Level4',
                },
                hovered: {
                    backgroundColor: 'colors.primaryContainerOnHover',
                },
            },
        },
        contained: {
            backgroundColor: 'colors.primary',
            color: 'colors.onPrimary',

            states: {
                disabled: {
                    backgroundColor: 'colors.stateLayer.disabled.onSurface',
                    color: 'colors.stateLayer.disabled.onSurface_Level4',
                },
                hovered: {
                    backgroundColor: 'colors.primaryOnHover',
                },
            },
        },
        elevated: {
            backgroundColor: 'colors.elevation.level1',
            color: 'colors.primary',

            states: {
                disabled: {
                    backgroundColor: 'colors.surfaceDisabled',
                    color: 'colors.stateLayer.disabled.onSurface_Level4',
                },
                hovered: {
                    backgroundColor: 'colors.primaryContainerOnHover',
                },
            },
        },
        'contained-tonal': {
            backgroundColor: 'colors.secondaryContainer',
            color: 'colors.onSecondaryContainer',

            states: {
                disabled: {
                    backgroundColor: 'colors.surfaceDisabled',
                    color: 'colors.stateLayer.disabled.onSurface_Level4',
                },
                hovered: {
                    backgroundColor: 'colors.secondaryContainerOnHover',
                },
            },
        },
    },
};
