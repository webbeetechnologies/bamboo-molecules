import { TextStyle, ViewStyle, StyleSheet } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type States = 'selectedAndDisabled' | 'disabled' | 'selected' | 'hovered' | 'selectedAndHovered';
type CustomProps = {
    buttonSize?: string;
    innerContainer?: ViewStyle;
    stateLayer?: ViewStyle;
    whiteSpace?: number;
};

export const defaultStyles: ComponentStylePropWithVariants<TextStyle, States, CustomProps> = {
    borderColor: 'colors.outline',
    color: 'colors.onSurfaceVariant',
    borderRadius: 'shapes.corner.full' as unknown as number,
    overflow: 'hidden',

    whiteSpace: 12,

    stateLayer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
        zIndex: -1,
    },

    sizes: {
        xs: {
            width: 26,
            height: 26,
            borderRadius: 'shapes.corner.full',
            // @ts-ignore
            iconSize: 18,
        },
        sm: {
            width: 30,
            height: 30,
            borderRadius: 'shapes.corner.full',
            // @ts-ignore
            iconSize: 20,
        },
        md: {
            width: 34,
            height: 34,
            borderRadius: 'shapes.corner.full',
            // @ts-ignore
            iconSize: 24,
        },
        lg: {
            width: 38,
            height: 38,
            borderRadius: 'shapes.corner.full',
            // @ts-ignore
            iconSize: 28,
        },
    },

    innerContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    states: {
        disabled: {
            opacity: 0.38,
        },
        selectedAndDisabled: {
            opacity: 0.38,
        },
    },
    variants: {
        default: {
            states: {
                selectedAndDisabled: {
                    color: 'colors.primary',
                },
                selected: {
                    color: 'colors.primary',
                },
                selectedAndHovered: {
                    color: 'colors.primary',

                    stateLayer: {
                        backgroundColor: 'colors.stateLayer.hover.primary',
                    },
                },
                hovered: {
                    stateLayer: {
                        backgroundColor: 'colors.stateLayer.hover.onSurfaceVariant',
                    },
                },
            },
        },
        contained: {
            backgroundColor: 'colors.surfaceVariant',
            color: 'colors.primary',

            states: {
                selectedAndDisabled: {
                    backgroundColor: 'colors.primary',
                    color: 'colors.onPrimary',
                },
                disabled: {
                    backgroundColor: 'colors.stateLayer.disabled.onSurface',
                },
                selected: {
                    backgroundColor: 'colors.primary',
                    color: 'colors.onPrimary',
                },
                hovered: {
                    stateLayer: {
                        backgroundColor: 'colors.stateLayer.hover.primary',
                    },
                },
                selectedAndHovered: {
                    backgroundColor: 'colors.primary',
                    color: 'colors.onPrimary',

                    stateLayer: {
                        backgroundColor: 'colors.stateLayer.hover.onPrimary',
                    },
                },
            },
        },
        'contained-tonal': {
            backgroundColor: 'colors.surfaceVariant',
            color: 'colors.onSurfaceVariant',

            states: {
                selectedAndDisabled: {
                    backgroundColor: 'colors.secondaryContainer',
                    color: 'colors.onSecondaryContainer',
                },
                disabled: {
                    backgroundColor: 'colors.stateLayer.disabled.onSurface',
                },
                selected: {
                    backgroundColor: 'colors.secondaryContainer',
                    color: 'colors.onSecondaryContainer',
                },
                hovered: {
                    stateLayer: {
                        backgroundColor: 'colors.stateLayer.hover.onSurfaceVariant',
                    },
                },
                selectedAndHovered: {
                    backgroundColor: 'colors.secondaryContainer',
                    color: 'colors.onSecondaryContainer',

                    stateLayer: {
                        backgroundColor: 'colors.stateLayer.hover.onSecondaryContainer',
                    },
                },
            },
        },
        outlined: {
            color: 'colors.onSurfaceVariant',
            borderWidth: 1,

            states: {
                selectedAndDisabled: {
                    backgroundColor: 'colors.inverseSurface',
                    color: 'colors.inverseOnSurface',
                    borderWidth: 0,
                },
                disabled: {
                    borderColor: 'colors.onSurface',
                },
                selected: {
                    backgroundColor: 'colors.inverseSurface',
                    color: 'colors.inverseOnSurface',
                    borderWidth: 0,
                },
                hovered: {
                    stateLayer: {
                        backgroundColor: 'colors.stateLayer.hover.onSurfaceVariant',
                    },
                },
                selectedAndHovered: {
                    backgroundColor: 'colors.inverseSurface',
                    color: 'colors.inverseOnSurface',
                    borderWidth: 0,

                    stateLayer: {
                        backgroundColor: 'colors.stateLayer.hover.inverseOnSurface',
                    },
                },
            },
        },
    },
};
