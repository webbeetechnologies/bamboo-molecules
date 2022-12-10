import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type States = '';
type CustomProps = {
    modalBackground?: ViewStyle;
    contentContainer?: ViewStyle;
    modalContent?: ViewStyle;
};
type CustomSize = {
    modalContent?: ViewStyle;
};

export const defaultStyles: ComponentStylePropWithVariants<
    TextStyle,
    States,
    CustomProps,
    CustomSize
> = {
    modalBackground: {
        flex: 1,
        backgroundColor: 'colors.scrim',
        opacity: 0.3,
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    modalContent: {
        backgroundColor: 'colors.surface',
        overflow: 'hidden',
    },

    sizes: {
        md: {
            modalContent: {
                maxWidth: 400,
                maxHeight: 600,
                borderRadius: 10,
            },
        },
        lg: {
            modalContent: {
                maxWidth: 600,
                maxHeight: 800,
                borderRadius: 10,
            },
        },
    },
};
