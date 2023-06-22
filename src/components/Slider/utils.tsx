import type { ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type BaseStyleProp = {
    thumbTintColor: string;
};

type SliderStyleProp = {
    minimumTrackTintColor: string;
    maximumTrackTintColor: string;
} & BaseStyleProp;

export const sliderStyles: ComponentStylePropWithVariants<ViewStyle, '', SliderStyleProp> = {
    thumbTintColor: 'colors.primary',
    minimumTrackTintColor: 'colors.primary',
    maximumTrackTintColor: 'colors.lines',

    // TODO: Implement enabled/disabled states

    minWidth: 100,
};

type RangeStyleProp = {
    inboundColor: string;
} & BaseStyleProp;

export const rangeSliderStyles: ComponentStylePropWithVariants<ViewStyle, '', RangeStyleProp> = {
    thumbTintColor: 'colors.primary',
    inboundColor: 'colors.primary',

    // TODO: Implement enabled/disabled states

    minWidth: 100,
};
