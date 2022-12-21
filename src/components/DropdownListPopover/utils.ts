import type { ViewStyle, TextStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type CustomProps = {
    overlay?: ViewStyle;
    initialTransition?: ViewStyle & { scale?: number; transition?: { duration: number } };
    animateTransition?: ViewStyle & { scale?: number; transition?: { duration: number } };
    exitTransition?: ViewStyle & { scale?: number; transition?: { duration: number } };
    content?: ViewStyle;
    contentText?: TextStyle;
    backdrop?: ViewStyle;
    arrow?: ViewStyle;
};

export const defaultStyles: ComponentStylePropWithVariants<ViewStyle, '', CustomProps> = {
    initialTransition: {
        opacity: 0,
    },
    animateTransition: {
        opacity: 1,
        transition: {
            duration: 150 as unknown as number,
        },
    },
    exitTransition: {
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: 100,
        },
    },
    content: {
        borderRadius: 'shapes.corner.extraSmall' as unknown as number,
    },
    contentText: {
        display: 'flex',
        flexDirection: 'column',
    },
    backdrop: {
        opacity: 0,
    },
};
