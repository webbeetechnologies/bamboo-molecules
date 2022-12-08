import type { ComponentStylePropWithVariants } from '../../types';
import type { TextStyle, ViewStyle } from 'react-native';

type CustomProps = {
    overlay?: ViewStyle;
    initialTransition?: ViewStyle & { scale?: number; transition?: { duration: number } };
    animateTransition?: ViewStyle & { scale?: number; transition?: { duration: number } };
    exitTransition?: ViewStyle & { scale?: number; transition?: { duration: number } };
    contentText?: TextStyle;
    content?: ViewStyle;
    arrow?: ViewStyle;
};

export const defaultStyles: ComponentStylePropWithVariants<ViewStyle, '', CustomProps> = {
    initialTransition: { opacity: 0 },
    animateTransition: { opacity: 1, transition: { duration: 150 as unknown as number } },
    exitTransition: { opacity: 0, scale: 0.95, transition: { duration: 100 } },
    contentText: {
        color: 'colors.onSurface',
    },
    content: {
        backgroundColor: 'colors.surface',
        padding: 'spacings.2',
        borderRadius: 'shapes.corner.small' as unknown as number,
    },
    arrow: {
        backgroundColor: 'colors.surface',
        borderColor: 'colors.surface',
        elevation: 1,
    },
};
