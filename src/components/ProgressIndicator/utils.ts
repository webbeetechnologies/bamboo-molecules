import type { ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from 'src/types';

type CustomProps = {
    color?: string;
    animationScale?: string;
    container?: ViewStyle;
    animatedContainer?: ViewStyle;
    progressBar?: ViewStyle;
};
export const linearProgressIndicatorStyles: ComponentStylePropWithVariants<
    ViewStyle,
    '',
    CustomProps
> = {
    color: 'colors.primary',
    backgroundColor: 'colors.surfaceVariant',
    animationScale: 'animation.scale',

    container: {},
    animatedContainer: {
        height: 4,
        overflow: 'hidden',
    },

    progressBar: {
        flex: 1,
    },
};

type CircularCustomProps = {
    color?: string;
    trackColor?: string;
    animationScale?: string | number;
    thickness?: string | number;
    container?: ViewStyle;
    circle?: ViewStyle;
};

export const circularProgressIndicatorStyles: ComponentStylePropWithVariants<
    ViewStyle,
    '',
    CircularCustomProps
> = {
    color: 'colors.primary',
    trackColor: 'colors.surfaceVariant',
    animationScale: 'animation.scale',

    container: {
        borderRadius: 'shapes.corner.full' as unknown as number,
        overflow: 'hidden',
    },
    circle: {
        transform: [{ rotateZ: '270deg' }],
    },
};
