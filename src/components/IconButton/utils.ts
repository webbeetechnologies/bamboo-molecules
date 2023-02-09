import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type States = 'selectedAndDisabled' | 'disabled' | 'selected';
type CustomProps = {
    buttonSize?: string;
    innerContainer?: ViewStyle;
    whiteSpace?: number;
};

export const defaultStyles: ComponentStylePropWithVariants<TextStyle, States, CustomProps> = {
    borderColor: 'colors.outline',
    color: 'colors.onSurfaceVariant',
    borderRadius: 'shapes.corner.full' as unknown as number,
    overflow: 'hidden',

    whiteSpace: 12,

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
            },
        },
    },
};
