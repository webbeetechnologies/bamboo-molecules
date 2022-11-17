import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type CustomProps = {
    animationScale?: string; // because it's a design token
    button?: ViewStyle;
    content?: ViewStyle;
    icon?: ViewStyle;
    iconTextMode?: ViewStyle;
    label?: TextStyle;
    uppercaseLabel?: TextStyle;
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

    button: {
        borderStyle: 'solid',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
        textAlign: 'center',
        marginVertical: 'spacings.2l',
        marginHorizontal: 'spacings.6',
    },
    uppercaseLabel: {
        textTransform: 'uppercase',
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
            borderRadius: 'roundness.5',
            typeScale: 'typescale.labelMedium',
        },
        md: {
            minWidth: 64,
            iconSize: 24,
            borderRadius: 'roundness.5',
            typeScale: 'typescale.labelLarge',
        },
        lg: {
            minWidth: 64,
            iconSize: 26,
            borderRadius: 'roundness.5',
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
                    color: 'colors.onSurfaceDisabled',
                    borderColor: 'colors.surfaceDisabled',
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
                disabled: {},
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
                    backgroundColor: 'transparent',
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
                },
                hovered: {
                    backgroundColor: 'colors.secondaryContainerOnHover',
                },
            },
        },
    },
};

// TODO Revisit to match MD3 guideline
export const styles = StyleSheet.create({
    button: {
        borderStyle: 'solid',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
        textAlign: 'center',
        marginVertical: 'spacings.2l',
        marginHorizontal: 'spacings.6',
    },
    uppercaseLabel: {
        textTransform: 'uppercase',
    },
    labelText: {
        marginHorizontal: 'spacings.3',
    },
    labelTextAddons: {
        marginHorizontal: 'spacings.4',
    },
});
