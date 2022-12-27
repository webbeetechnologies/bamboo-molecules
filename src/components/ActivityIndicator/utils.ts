import { StyleSheet, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

export const styles = {
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    layer: {
        ...StyleSheet.absoluteFillObject,

        justifyContent: 'center',
        alignItems: 'center',
    },
};

type CustomProps = {
    color?: string;
    animationScale?: string;
};

export const activityIndicatorStyles: ComponentStylePropWithVariants<ViewStyle, '', CustomProps> = {
    color: 'colors.primary',
    animationScale: 'animation.scale',
};
