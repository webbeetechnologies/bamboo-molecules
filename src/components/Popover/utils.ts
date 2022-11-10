import type { ComponentStylePropWithVariants } from '../../types';
import { StyleSheet, ViewStyle } from 'react-native';

type CustomProps = {
    overlay: ViewStyle;
    initialTransition: ViewStyle;
    animateTransition: ViewStyle & { transition: { duration: number } };
    exitTransition: ViewStyle & { scale: number; transition: { duration: number } };
    content: ViewStyle;
    arrow: ViewStyle;
};

export const defaultStyles: ComponentStylePropWithVariants<ViewStyle, '', CustomProps> = {
    overlay: StyleSheet.absoluteFillObject,
    initialTransition: { opacity: 0 },
    animateTransition: { opacity: 1, transition: { duration: 150 as unknown as number } },
    exitTransition: { opacity: 0, scale: 0.95, transition: { duration: 100 } },
    content: {
        backgroundColor: 'colors.onSurface',
        padding: 'spacings.2',
        borderRadius: 'roundness.2' as unknown as number,
    },
    arrow: {
        backgroundColor: 'colors.onSurface',
        borderColor: 'colors.onSurface',
        elevation: 1,
    },
};
