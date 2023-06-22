import { RangeSlider } from '@sharcoux/slider';
import type { SliderProps as RangeSliderProps } from '@sharcoux/slider/dist/RangeSlider';
import { memo, useMemo } from 'react';
import { useComponentStyles } from '../../hooks';

export type Props = RangeSliderProps & {};

const Component = ({ style, ...rest }: Props) => {
    const componentStyles = useComponentStyles('Slider', [style]);

    const { colorProps, sliderStyles } = useMemo(() => {
        const {
            thumbTintColor: _thumbTintColor,
            minimumTrackTintColor: _minimumTrackTintColor,
            maximumTrackTintColor: _maximumTrackTintColor,
            slider: _sliderStyles,
        } = componentStyles;

        return {
            colorProps: {
                thumbTintColor: _thumbTintColor,
                minimumTrackTintColor: _minimumTrackTintColor,
                maximumTrackTintColor: _maximumTrackTintColor,
                inboundColor: _minimumTrackTintColor,
            },
            sliderStyles: _sliderStyles,
        };
    }, [componentStyles]);

    return <RangeSlider style={sliderStyles} {...colorProps} {...rest} />;
};

export default memo(Component);
