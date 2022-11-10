import { forwardRef, memo, useEffect, useMemo, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { useMolecules } from '../../hooks';
import { DEFAULT_ARROW_HEIGHT, DEFAULT_ARROW_WIDTH } from './constants';
import { usePopperContext } from './PopperContext';
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
    const { triggerRef } = usePopperContext();

    const [triggerMeasurements, setTriggerMeasurments] = useState<number[]>([]);

    const additionalStyles = useMemo(
        () => getArrowStyles({ placement: actualPlacement, height, width, triggerMeasurements }),
        [actualPlacement, height, width, triggerMeasurements],
    );

    const triangleStyle: ViewStyle = useMemo(
        () => ({
            position: 'absolute',
            width,
            height,
        }),
        [width, height],
    );

    useEffect(() => {
        triggerRef.current?.measureInWindow((...args) => setTriggerMeasurments(args));
    }, []);

    const arrowStyles = useMemo(
        () => [triangleStyle, additionalStyles, style],
        [triangleStyle, additionalStyles, style],
    );

    return <View ref={ref} style={arrowStyles} {...rest} />;
};

PopperArrow.displayName = 'PopperArrow';

export default memo(forwardRef(PopperArrow));
