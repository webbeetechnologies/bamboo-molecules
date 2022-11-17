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
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    modalContent: {
        flex: 1,
        width: '100%',
        backgroundColor: 'colors.surface',
    },

    sizes: {
        md: {},
        lg: {
            modalContent: {
                maxWidth: 600,
                maxHeight: 800,
                borderRadius: 10,
                width: '100%',
                overflow: 'hidden',
            },
        },
    },
};
