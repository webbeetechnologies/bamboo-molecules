import type { ComponentStylePropWithVariants } from '../../types';
import type { TextStyle, ViewStyle } from 'react-native';

type CustomProps = {
    contentText?: TextStyle;
};

export const tooltipStyles: ComponentStylePropWithVariants<ViewStyle, '', CustomProps> = {
    contentText: {},
};
