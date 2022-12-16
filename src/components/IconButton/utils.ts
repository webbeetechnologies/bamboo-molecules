import type { TextStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type States = 'disabled' | 'selected'; // 'disabled' | 'hovered' | 'pressed';
type CustomProps = {
    buttonSize?: string;
};

export const defaultStyles: ComponentStylePropWithVariants<TextStyle, States, CustomProps> = {
    borderColor: 'colors.outline',
    color: 'colors.onSurfaceVariant',

    sizes: {
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

    states: {
        disabled: {
            borderColor: 'colors.surfaceDisabled',
            color: 'colors.onSurfaceDisabled',
            opacity: 0.32,
        },
        selected: {
            color: 'colors.primary',
        },
    },
    variants: {
        contained: {
            backgroundColor: 'colors.surfaceVariant',
            color: 'colors.primary',

            states: {
                disabled: {
                    backgroundColor: 'colors.surfaceDisabled',
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
                disabled: {
                    backgroundColor: 'colors.surfaceDisabled',
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
                selected: {
                    backgroundColor: 'colors.inverseSurface',
                    color: 'colors.inverseOnSurface',
                    borderWidth: 0,
                },
            },
        },
    },
};
