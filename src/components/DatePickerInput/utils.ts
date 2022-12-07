import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type DatePickerInputCustomProps = {
    container?: ViewStyle;
};

export const datePickerInputStyles: ComponentStylePropWithVariants<
    TextStyle,
    '',
    DatePickerInputCustomProps
> = {
    container: {
        minWidth: 150,
        justifyContent: 'center',
    },
};
