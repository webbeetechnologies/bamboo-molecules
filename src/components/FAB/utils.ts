import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type States = 'hovered' | 'disabled';
type CustomProps = {
    animationDuration?: string;
    innerContainer?: ViewStyle;
    iconSize?: number;
    icon?: TextStyle;
    label?: TextStyle;
    stateLayer?: ViewStyle;
};
type CustomSizeProps = CustomProps & {};

export const fabStyles: ComponentStylePropWithVariants<
    ViewStyle,
    States,
    CustomProps,
    CustomSizeProps
> = {
    iconSize: 24,
    animationDuration: 'animation.durations.1',

    innerContainer: {
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    states: {
        disabled: {
            backgroundColor: 'colors.surfaceDisabled',

            stateLayer: {
                backgroundColor: 'colors.stateLayer.disabled.onSurface',
            },

            icon: {
                color: 'colors.onSurfaceDisabled',
            },
            label: {
                color: 'colors.onSurfaceDisabled',
            },
        },
    },

    variants: {
        primary: {
            backgroundColor: 'colors.primaryContainer',

            icon: {
                color: 'colors.onPrimaryContainer',
            },
            label: {
                color: 'colors.onPrimaryContainer',
            },

            states: {
                hovered: {
                    stateLayer: {
                        backgroundColor: 'colors.stateLayer.hover.onPrimaryContainer',
                    },
                },
            },
        },
        secondary: {
            backgroundColor: 'colors.secondaryContainer',

            icon: {
                color: 'colors.onSecondaryContainer',
            },
            label: {
                color: 'colors.onPrimaryContainer',
            },

            states: {
                hovered: {
                    stateLayer: {
                        backgroundColor: 'colors.stateLayer.hover.onSecondaryContainer',
                    },
                },
            },
        },
        tertiary: {
            backgroundColor: 'colors.tertiaryContainer',

            icon: {
                color: 'colors.onTertiaryContainer',
            },
            label: {
                color: 'colors.onPrimaryContainer',
            },

            states: {
                hovered: {
                    stateLayer: {
                        backgroundColor: 'colors.stateLayer.hover.onTertiaryContainer',
                    },
                },
            },
        },
        surface: {
            backgroundColor: 'colors.surface',

            icon: {
                color: 'colors.primary',
            },
            label: {
                color: 'colors.primary',
            },

            states: {
                hovered: {
                    stateLayer: {
                        backgroundColor: 'colors.stateLayer.hover.primary',
                    },
                },
            },
        },
    },

    sizes: {
        sm: {
            iconSize: 24,
            minHeight: 40,
            minWidth: 40,
            borderRadius: 'shapes.corner.medium',

            innerContainer: {
                padding: 'spacings.3',
                borderRadius: 'shapes.corner.medium' as unknown as number,
            },
            stateLayer: {
                borderRadius: 'shapes.corner.medium' as unknown as number,
            },

            label: {
                fontSize: 'typescale.labelMedium.fontSize' as unknown as number,
                lineHeight: 'typescale.labelMedium.lineHeight' as unknown as number,
                fontWeight:
                    'typescale.labelMedium.fontWeight' as unknown as TextStyle['fontWeight'],
                marginLeft: 'spacings.1',
            },
        },
        md: {
            iconSize: 24,
            minHeight: 56,
            minWidth: 56,
            borderRadius: 'shapes.corner.large',

            innerContainer: {
                padding: 'spacings.4',
                borderRadius: 'shapes.corner.large' as unknown as number,
            },
            stateLayer: {
                borderRadius: 'shapes.corner.large' as unknown as number,
            },

            label: {
                fontSize: 'typescale.labelLarge.fontSize' as unknown as number,
                lineHeight: 'typescale.labelLarge.lineHeight' as unknown as number,
                fontWeight: 'typescale.labelLarge.fontWeight' as unknown as TextStyle['fontWeight'],
                marginLeft: 'spacings.2',
            },
        },
        lg: {
            iconSize: 36,
            minHeight: 96,
            minWidth: 96,
            borderRadius: 'shapes.corner.extraLarge',

            innerContainer: {
                padding: 'spacings.7',
                borderRadius: 'shapes.corner.extraLarge' as unknown as number,
            },

            stateLayer: {
                borderRadius: 'shapes.corner.extraLarge' as unknown as number,
            },

            label: {
                fontSize: 'typescale.bodyExtraLarge.fontSize' as unknown as number,
                lineHeight: 'typescale.bodyExtraLarge.lineHeight' as unknown as number,
                fontWeight:
                    'typescale.bodyExtraLarge.fontWeight' as unknown as TextStyle['fontWeight'],
                marginLeft: 'spacings.3',
            },
        },
    },
};
