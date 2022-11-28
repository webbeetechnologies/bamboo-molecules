import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type CustomProps = {
    minInput?: ViewStyle;
    maxInput?: ViewStyle;
    divider?: TextStyle;
    errorText?: TextStyle;
};

export const numberRangeInputStyles: ComponentStylePropWithVariants<ViewStyle, '', CustomProps> = {
    flexDirection: 'row',
    alignItems: 'center',

    minInput: {
        flex: 1,
    },
    maxInput: {
        flex: 1,
    },
    divider: {
        marginHorizontal: 10,
        fontSize: 18,
    },
    errorText: {
        color: 'colors.error',
    },
};
