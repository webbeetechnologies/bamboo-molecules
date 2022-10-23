import { StyleSheet, TextStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type CustomProps = {
    typeScale?: string; // because it's a design token
    animationScale?: string;
    iconSize?: string;
};

export const defaultStyles: ComponentStylePropWithVariants<
    TextStyle,
    'disabled' | 'hovered',
    CustomProps
> = {
    typeScale: 'typescale.labelLarge',
    animationScale: 'animation.scale',
    borderRadius: 'roundness.5' as unknown as number, // TODO better type definitions for design tokens
    iconSize: 'sizes.4l',

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

export const styles = StyleSheet.create({
    button: {
        minWidth: 64,
        borderStyle: 'solid',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginLeft: 16,
        marginRight: -16,
    },
    iconReverse: {
        marginLeft: -16,
        marginRight: 16,
    },
    iconTextMode: {
        marginLeft: 12,
        marginRight: -8,
    },
    iconReverseTextMode: {
        marginLeft: -8,
        marginRight: 12,
    },
    label: {
        textAlign: 'center',
        marginVertical: 10,
        marginHorizontal: 24,
    },
    uppercaseLabel: {
        textTransform: 'uppercase',
    },
    labelText: {
        marginHorizontal: 12,
    },
    labelTextAddons: {
        marginHorizontal: 16,
    },
});
