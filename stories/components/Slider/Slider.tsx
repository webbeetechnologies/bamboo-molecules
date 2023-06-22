import { RangeSlider, RangeSliderProps, Slider, SliderProps } from '../../../src/components';

export const SliderExample = (props: SliderProps) => {
    return <Slider {...props} />;
};

export const RangeSliderExample = (props: RangeSliderProps) => {
    return <RangeSlider {...props} />;
};
