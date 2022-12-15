import type { ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type States = 'hovered' | 'focused' | 'pressed' | 'disabled';
type CustomProps = {
    animationDuration?: string;
    container?: ViewStyle;
    innerContainer?: ViewStyle;
};

export const cardStyles: ComponentStylePropWithVariants<ViewStyle, States, CustomProps> = {
    animationDuration: 'animation.durations.1',

    container: {
        borderRadius: 'shapes.corner.medium' as unknown as number,
    },
    innerContainer: {
        borderRadius: 'shapes.corner.medium' as unknown as number,
    },

    variants: {
        elevated: {
            backgroundColor: 'colors.surface',

            states: {
                disabled: {
                    backgroundColor: 'colors.surfaceVariant',
                    opacity: 0.38,
                },
            },
        },
        filled: {
            backgroundColor: 'colors.surfaceVariant',

            states: {
                disabled: {
                    backgroundColor: 'colors.surface',
                    opacity: 0.38,
                },
            },
        },
        outlined: {
            backgroundColor: 'colors.surface',
            borderWidth: 1,
            borderColor: 'colors.outline',

            states: {
                disabled: {
                    opacity: 0.12,
                },
            },
        },
    },
};
