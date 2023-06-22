import type { ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type CustomProp = {
    thumbTintColor: string;
    minimumTrackTintColor: string;
    maximumTrackTintColor: string;

    slider: ViewStyle;
};

export const sliderStyles: ComponentStylePropWithVariants<ViewStyle, '', CustomProp> = {
    thumbTintColor: 'colors.primary',
    minimumTrackTintColor: 'colors.primary',
    maximumTrackTintColor: 'colors.lines',

    // TODO: Implement enabled/disabled states

    slider: {
        minWidth: 100,
    },
};
