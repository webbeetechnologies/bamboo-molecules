import type { TextStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type States = 'disabled' | 'selected'; // 'disabled' | 'hovered' | 'pressed';
type CustomProps = {
    // labelColor: string
    // checkedColor: string;
};

export const defaultStyles: ComponentStylePropWithVariants<TextStyle, States, CustomProps> = {
    borderColor: 'colors.outline',
    color: 'colors.onSurfaceVariant',

    states: {
        disabled: {
            borderColor: 'colors.surfaceDisabled',
            color: 'colors.onSurfaceDisabled',
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
