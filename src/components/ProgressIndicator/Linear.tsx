import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    Animated,
    I18nManager,
    LayoutChangeEvent,
    Platform,
    StyleProp,
    View,
    ViewProps,
    ViewStyle,
} from 'react-native';
import { useComponentStyles } from '../../hooks';

export type Props = ViewProps & {
    /**
     * Animated value (between 0 and 1). This tells the progress bar to rely on this value to animate it.
     * Note: It should not be used in parallel with the `progress` prop.
     */
    animatedValue?: number;
    /**
     * Progress value (between 0 and 1).
     * Note: It should not be used in parallel with the `animatedValue` prop.
     */
    progress?: number;
    /**
     * Color of the progress bar.
     */
    color?: string;
    /**
     * trackColor of the progress bar.
     */
    trackColor?: string;
    /**
     * If the progress bar will show indeterminate progress.
     */
    indeterminate?: boolean;
    /**
     * Whether to show the ProgressBar (true, the default) or hide it (false).
     */
    visible?: boolean;
    /**
     * animationDuration of the indeterminate state
     */
    indeterminateDuration?: number;
    /**
     * max width for the indeterminate progressbar
     */
    indeterminateMaxWidth?: number;
    containerStyle?: ViewStyle;
    style?: StyleProp<ViewStyle>;
};

const { isRTL } = I18nManager;

const LinearProgressIndicator = ({
    color: colorProp,
    trackColor: trackColorProp,
    indeterminate,
    style,
    progress = 0,
    visible = true,
    indeterminateDuration = 2000,
    indeterminateMaxWidth = 0.6,
    animatedValue,
    containerStyle: containerStyleProp,
    ...rest
}: Props) => {
    const componentStyles = useComponentStyles('ProgressIndicator_Linear', [
        style,
        colorProp ? { color: colorProp } : {},
        trackColorProp ? { backgroundColor: trackColorProp } : {},
        { container: containerStyleProp || {} },
    ]);

    const { current: timer } = useRef<Animated.Value>(new Animated.Value(0));
    const { current: fade } = useRef<Animated.Value>(new Animated.Value(0));
    const [width, setWidth] = useState<number>(0);
    const [prevWidth, setPrevWidth] = useState<number>(0);

    const indeterminateAnimation = useRef<Animated.CompositeAnimation | null>(null);

    const onLayout = useCallback(
        (event: LayoutChangeEvent) => {
            setPrevWidth(width);
            setWidth(event.nativeEvent.layout.width);
        },
        [width],
    );

    const {
        scale,
        accessibilityValue,
        accessibilityState,
        containerStyle,
        animatedContainerStyle,
        progressBarStyle,
    } = useMemo(() => {
        const { color, animationScale, container, animatedContainer, progressBar, ...restStyle } =
            componentStyles;

        return {
            scale: animationScale,
            accessibilityState: { busy: visible },
            accessibilityValue: indeterminate ? {} : { min: 0, max: 100, now: progress * 100 },
            containerStyle: container,
            animatedContainerStyle: [animatedContainer, { opacity: fade }, restStyle],
            progressBarStyle: [
                progressBar,
                {
                    width,
                    backgroundColor: color,
                    transform: [
                        {
                            translateX: timer.interpolate(
                                indeterminate
                                    ? {
                                          inputRange: [0, 0.5, 1],
                                          outputRange: [
                                              (isRTL ? 1 : -1) * 0.5 * width,
                                              (isRTL ? 1 : -1) *
                                                  0.5 *
                                                  indeterminateMaxWidth *
                                                  width,
                                              (isRTL ? -1 : 1) * 0.7 * width,
                                          ],
                                      }
                                    : {
                                          inputRange: [0, 1],
                                          outputRange: [(isRTL ? 1 : -1) * 0.5 * width, 0],
                                      },
                            ),
                        },
                        {
                            // Workaround for workaround for https://github.com/facebook/react-native/issues/6278
                            scaleX: timer.interpolate(
                                indeterminate
                                    ? {
                                          inputRange: [0, 0.5, 1],
                                          outputRange: [0.0001, indeterminateMaxWidth, 0.0001],
                                      }
                                    : {
                                          inputRange: [0, 1],
                                          outputRange: [0.0001, 1],
                                      },
                            ),
                        },
                    ],
                },
            ],
        };
    }, [
        componentStyles,
        fade,
        indeterminate,
        indeterminateMaxWidth,
        progress,
        timer,
        visible,
        width,
    ]);

    const startAnimation = useCallback(() => {
        // Show progress bar
        Animated.timing(fade, {
            duration: 200 * scale,
            toValue: 1,
            useNativeDriver: true,
            isInteraction: false,
        }).start();

        if (animatedValue && animatedValue >= 0) {
            return;
        }

        // Animate progress bar
        if (indeterminate) {
            if (!indeterminateAnimation.current) {
                indeterminateAnimation.current = Animated.timing(timer, {
                    duration: indeterminateDuration,
                    toValue: 1,
                    // Animated.loop does not work if useNativeDriver is true on web
                    useNativeDriver: Platform.OS !== 'web',
                    isInteraction: false,
                });
            }

            // Reset timer to the beginning
            timer.setValue(0);

            Animated.loop(indeterminateAnimation.current).start();
        } else {
            Animated.timing(timer, {
                duration: 200 * scale,
                toValue: progress ? progress : 0,
                useNativeDriver: true,
                isInteraction: false,
            }).start();
        }
        /**
         * We shouldn't add @param animatedValue to the
         * deps array, to avoid the unnecessary loop.
         * We can only check if the prop is passed initially,
         * and we do early return.
         */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fade, scale, indeterminate, timer, indeterminateDuration, progress]);

    const stopAnimation = useCallback(() => {
        // Stop indeterminate animation
        if (indeterminateAnimation.current) {
            indeterminateAnimation.current.stop();
        }

        Animated.timing(fade, {
            duration: 200 * scale,
            toValue: 0,
            useNativeDriver: true,
            isInteraction: false,
        }).start();
    }, [fade, scale]);

    useEffect(() => {
        if (visible) startAnimation();
        else stopAnimation();
    }, [visible, startAnimation, stopAnimation]);

    useEffect(() => {
        if (animatedValue && animatedValue >= 0) {
            timer.setValue(animatedValue);
        }
    }, [animatedValue, timer]);

    useEffect(() => {
        // Start animation the very first time when previously the width was unclear
        if (visible && prevWidth === 0) {
            startAnimation();
        }
    }, [prevWidth, startAnimation, visible]);

    return (
        <View
            onLayout={onLayout}
            {...rest}
            style={containerStyle}
            accessible
            accessibilityRole="progressbar"
            accessibilityState={accessibilityState}
            accessibilityValue={accessibilityValue}>
            <Animated.View style={animatedContainerStyle}>
                <>{width ? <Animated.View style={progressBarStyle} /> : null}</>
            </Animated.View>
        </View>
    );
};

export default memo(LinearProgressIndicator);
