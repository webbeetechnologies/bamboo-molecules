import { memo, useMemo, useRef, useEffect } from 'react';
import { ViewStyle, StyleProp, Platform, Animated } from 'react-native';
import Svg, { Circle as CircleSvg } from 'react-native-svg';

import { useComponentStyles, useMolecules } from '../../hooks';
import type { ActivityIndicatorProps } from '../ActivityIndicator';

const AnimatedCircle = Animated.createAnimatedComponent(CircleSvg);

export type Props = ActivityIndicatorProps & {
    /**
     *  Progress value (between 0 and 1).
     * */
    progress: number;
    /**
     * whether or not the ActivityIndicator will continuously animating
     * */
    indeterminate?: boolean;
    /**
     * trackColor of the Circle
     * only applicable to determinate state
     * */
    trackColor?: string;
    /**
     * Size of the Circle
     * */
    size?: number;
    /**
     * Color of the circumference of the circle
     * */
    color?: string;
    /**
     * animationDuration of the indeterminate state
     */
    indeterminateDuration?: number;
    style?: StyleProp<ViewStyle>;
};

const CircularProgressIndicator = ({
    indeterminate = false,
    size = 24,
    progress = 0,
    style: styleProp,
    color: colorProp,
    trackColor: trackColorProp,
    indeterminateDuration,
    ...rest
}: Props) => {
    const { View, ActivityIndicator } = useMolecules();

    const progressAnim = useRef(new Animated.Value(1)).current;

    const componentStyle = useComponentStyles('ProgressIndicator_Circular', [
        styleProp,
        colorProp ? { color: colorProp } : {},
        trackColorProp ? { trackColor: trackColorProp } : {},
    ]);
    const {
        containerStyle,
        progressStyle,
        animationScale,
        strokeColor,
        strokeTrackColor,
        thickness,
    } = useMemo(() => {
        const {
            trackColor,
            color,
            animationScale: scale,
            container,
            circle,
            ...restStyle
        } = componentStyle;

        return {
            strokeTrackColor: trackColor,
            strokeColor: color,
            animationScale: scale,
            thickness: size / 10,
            containerStyle: [
                {
                    width: size,
                    height: size,
                },
                container,
                restStyle,
            ],
            progressStyle: circle,
        };
    }, [componentStyle, size]);

    const { r, cx, cy, circumference, strokeDashoffset } = useMemo(() => {
        const radius = (size - thickness) / 2;
        const alpha = progressAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, Math.PI * 2],
        });
        return {
            r: radius,
            cx: size / 2,
            cy: size / 2,
            circumference: radius * 2 * Math.PI,
            strokeDashoffset: Animated.multiply(alpha, radius),
        };
    }, [progressAnim, size, thickness]);

    useEffect(() => {
        Animated.timing(progressAnim, {
            duration: 500 * animationScale,
            toValue: 1 - progress,
            useNativeDriver: Platform.OS !== 'web',
        }).start();
    }, [animationScale, progress, progressAnim]);

    // if it's indeterminate state, we want to use ActivityIndicator instead
    if (indeterminate)
        return (
            <ActivityIndicator
                color={strokeColor}
                size={size}
                duration={indeterminateDuration}
                {...rest}
            />
        );

    return (
        <View style={containerStyle} {...rest}>
            <Svg width="100%" height="100%" style={progressStyle}>
                <CircleSvg
                    stroke={strokeTrackColor}
                    fill="none"
                    strokeWidth={thickness}
                    cx={cx}
                    cy={cy}
                    r={r}
                />
                <AnimatedCircle
                    stroke={strokeColor}
                    fill="none"
                    strokeDasharray={`${circumference}, ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    strokeWidth={thickness}
                    cx={cx}
                    cy={cy}
                    r={r}
                />
            </Svg>
        </View>
    );
};

export default memo(CircularProgressIndicator);
