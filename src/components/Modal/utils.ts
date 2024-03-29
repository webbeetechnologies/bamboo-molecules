import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type States = '';
type CustomProps = {
    animationScale?: string;
    backdrop?: ViewStyle;
    contentContainer?: ViewStyle;
    modalContent?: ViewStyle;
};
type CustomSize = {
    modalContent?: ViewStyle;
};

export const modalStyles: ComponentStylePropWithVariants<
    TextStyle,
    States,
    CustomProps,
    CustomSize
> = {
    animationScale: 'animation.scale',

    backdrop: {
        flex: 1,
        backgroundColor: 'colors.backdrop',
    },

    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    modalContent: {
        minWidth: 280,
        backgroundColor: 'colors.surface',
        overflow: 'hidden',
    },

    sizes: {
        md: {
            modalContent: {
                maxWidth: 560,
                borderRadius: 10,
            },
        },
        lg: {
            modalContent: {
                maxWidth: 700,
                borderRadius: 10,
            },
        },
    },
};
