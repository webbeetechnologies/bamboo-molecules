import { forwardRef, memo, useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import { useMolecules } from '../../hooks';
import { DEFAULT_ARROW_HEIGHT, DEFAULT_ARROW_WIDTH } from './constants';
import type { PopperArrowProps } from './types';
import { getArrowStyles } from './utils';

// This is an internal implementation of PopoverArrow
const PopperArrow = (
    {
        height = DEFAULT_ARROW_HEIGHT,
        width = DEFAULT_ARROW_WIDTH,
        actualPlacement,
        style,
        ...rest
    }: PopperArrowProps,
    ref: any,
) => {
    const { View } = useMolecules();

    const additionalStyles = useMemo(
        () => getArrowStyles({ placement: actualPlacement, height, width }),
        [actualPlacement, height, width],
    );

    const triangleStyle: ViewStyle = useMemo(
        () => ({
            position: 'absolute',
            width,
            height,
        }),
        [width, height],
    );

    const arrowStyles = useMemo(
        () => [triangleStyle, additionalStyles, style],
        [triangleStyle, additionalStyles, style],
    );

    return <View ref={ref} style={arrowStyles} {...rest} />;
};

PopperArrow.displayName = 'PopperArrow';

export default memo(forwardRef(PopperArrow));
