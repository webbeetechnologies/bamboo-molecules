import React, { useEffect, useRef, useState, memo, useMemo } from 'react';
import { Animated, StyleSheet } from 'react-native';
import Svg from 'react-native-svg';
import { useMolecules, useComponentStyles } from '../../../hooks';
import useCircleAnimation from './useCircleAnimation';

import Arc from './Shapes/Arc';

const CIRCLE = Math.PI * 2;

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedArc = Animated.createAnimatedComponent(Arc);

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        overflow: 'hidden',
    },
});

export type Props = {
    animated?: boolean;
    borderColor?: string;
    borderWidth?: number;
    color?: string;
    children?: React.ReactNode;
    direction?: 'clockwise' | 'counter-clockwise';
    formatText?: (progress: number) => string;
    indeterminate?: boolean;
    progress: number;

    showsText?: boolean;
    size?: number;
    style?: any;
    strokeCap?: 'butt' | 'square' | 'round';
    textStyle?: any;
    thickness?: number;
    unfilledColor?: string;
    endAngle?: number;
    allowFontScaling?: boolean;
    indeterminateAnimationDuration?: number;
    indeterminateProgress?: number;
};

const Circle = (props: Props) => {
    const {
        animated = true,
        borderColor,
        indeterminateProgress = 100,
        children,
        indeterminate = false,
        style,
        strokeCap,
        textStyle,
        unfilledColor,
        borderWidth = 1,
        color = 'rgba(0, 122, 255, 1)',
        direction = 'clockwise',
        formatText = (progress: number) => `${Math.round(progress)}%`,
        progress = 0,
        showsText = false,
        size = 40,
        thickness = 3,
        endAngle = 0.9,
        allowFontScaling = true,
        indeterminateAnimationDuration = 1000,
        ...rest
    } = props;
    const { View, Text } = useMolecules();

    // const [progressValue1, setProgressValue1] = useState(0);

    const { progressAnim, rotationAnim } = useCircleAnimation({
        progress,
        animated,
        direction,
        indeterminate,
        indeterminateAnimationDuration,
        indeterminateProgress,
    });

    const border = useMemo(
        () => borderWidth || (indeterminate ? 1 : 0),
        [indeterminate, borderWidth],
    );

    const radius = useMemo(() => size / 2 - border, [size, border]);
    const offset = useMemo(
        () => ({
            top: border,
            left: border,
        }),
        [border],
    );
    const textOffset = border + thickness;
    const textSize = size - textOffset * 2;

    const Surface = useMemo(() => (rotationAnim ? AnimatedSvg : Svg), [rotationAnim]);
    const Shape = useMemo(() => (animated ? AnimatedArc : Arc), [animated]);
    const progressValue = progress;
    // const progressValue = useMemo(
    //     () => (animated ? progressValue1 : progress),
    //     [animated, progressValue1],
    // );
    const angle = useMemo(
        () =>
            animated ? Animated.multiply(progressAnim, CIRCLE) : (progressAnim as number) * CIRCLE,
        [animated, progressAnim],
    );

    // useEffect(() => {
    //     if (animated && progressAnim instanceof Animated.Value) {
    //         progressAnim.addListener(event => {
    //             setProgressValue1(Math.round(event.value * 100));
    //         });
    //     }
    // }, []);

    return (
        <View style={[styles.container, style]} {...rest}>
            <Surface
                width={size}
                height={size}
                style={
                    indeterminate && rotationAnim
                        ? {
                              transform: [
                                  {
                                      rotate: rotationAnim.interpolate({
                                          inputRange: [0, 1],
                                          outputRange: ['0deg', '360deg'],
                                      }),
                                  },
                              ],
                          }
                        : undefined
                }>
                {unfilledColor && progressValue !== 1 ? (
                    <Shape
                        radius={radius}
                        offset={offset}
                        startAngle={angle}
                        endAngle={CIRCLE}
                        direction={direction}
                        stroke={unfilledColor}
                        strokeWidth={thickness}
                    />
                ) : (
                    false
                )}
                {!indeterminate ? (
                    <Shape
                        radius={radius}
                        offset={offset}
                        startAngle={0}
                        endAngle={angle}
                        direction={direction}
                        stroke={color}
                        strokeCap={strokeCap}
                        strokeWidth={thickness}
                    />
                ) : (
                    false
                )}
                {border ? (
                    <Arc
                        radius={size / 2}
                        startAngle={0}
                        endAngle={(indeterminate ? endAngle * 2 : 2) * Math.PI}
                        stroke={borderColor || color}
                        strokeCap={strokeCap}
                        strokeWidth={border}
                    />
                ) : (
                    false
                )}
            </Surface>
            {!indeterminate && showsText ? (
                <View
                    style={{
                        position: 'absolute',
                        left: textOffset,
                        top: textOffset,
                        width: textSize,
                        height: textSize,
                        borderRadius: textSize / 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Text
                        style={[
                            {
                                color,
                                fontSize: textSize / 4.5,
                                fontWeight: '300',
                            },
                            textStyle,
                        ]}
                        allowFontScaling={allowFontScaling}>
                        {formatText(progressValue)}
                    </Text>
                </View>
            ) : (
                false
            )}
            {children}
        </View>
    );
};

export default memo(Circle);
