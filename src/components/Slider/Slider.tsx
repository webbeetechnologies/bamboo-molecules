import { Slider } from '@sharcoux/slider';
import type { SliderProps } from '@sharcoux/slider/dist/Slider';
import { memo, useMemo } from 'react';
import { useComponentStyles } from '../../hooks';

export type Props = SliderProps & {};

const ComponentTemplate = ({ style, ...rest }: Props) => {
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
            },
            sliderStyles: _sliderStyles,
        };
    }, [componentStyles]);

    return <Slider style={sliderStyles} {...colorProps} {...rest} />;
};

export default memo(ComponentTemplate);
