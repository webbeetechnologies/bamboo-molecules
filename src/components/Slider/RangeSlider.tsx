import { RangeSlider } from '@sharcoux/slider';
import type { SliderProps as RangeSliderProps } from '@sharcoux/slider/dist/RangeSlider';
import { memo, useMemo } from 'react';
import { useComponentStyles } from '../../hooks';

export type Props = RangeSliderProps & {};

const Component = ({
    style,
    thumbTintColor: thumbTintColorProp,
    inboundColor: inboundColorProp,
    ...rest
}: Props) => {
    const componentStyles = useComponentStyles('RangeSlider', [
        style,
        {
            ...(thumbTintColorProp ? { thumbTintColor: thumbTintColorProp } : {}),
            ...(inboundColorProp ? { inboundColor: inboundColorProp } : {}),
        },
    ]);

    const { colorProps, sliderStyles } = useMemo(() => {
        const {
            thumbTintColor: _thumbTintColor,
            inboundColor: _inboundColor,
            ..._sliderStyles
        } = componentStyles;

        return {
            colorProps: {
                thumbTintColor: _thumbTintColor,
                inboundColor: _inboundColor,
            },
            sliderStyles: _sliderStyles,
        };
    }, [componentStyles]);

    return <RangeSlider style={sliderStyles} {...colorProps} {...rest} />;
};

export default memo(Component);
