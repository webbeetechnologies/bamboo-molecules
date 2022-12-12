import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type CustomProps = {
    inputsContainer?: ViewStyle;
    minInput?: ViewStyle;
    maxInput?: ViewStyle;
    divider?: TextStyle;
    errorText?: TextStyle;
};

export const numberRangeInputStyles: ComponentStylePropWithVariants<ViewStyle, '', CustomProps> = {
    inputsContainer: {},
    minInput: {
        flex: 1,
    },
    maxInput: {
        flex: 1,
    },
    errorText: {
        color: 'colors.error',
    },
};
