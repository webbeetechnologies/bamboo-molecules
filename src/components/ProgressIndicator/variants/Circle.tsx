import * as React from 'react';
import {
    StyleSheet,
    ViewStyle,
    StyleProp,
    LayoutChangeEvent,
    Easing,
    TextStyle,
} from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Circle as CircleSvg } from 'react-native-svg';
import { Animated } from 'react-native';
import { useComponentStyles, useMolecules } from '../../../hooks';

const { multiply } = Animated;

const AnimatedCircle = Animated.createAnimatedComponent(CircleSvg);
const { PI } = Math;

export type Props = {
    progress: number;
    animated?: boolean;
    indeterminate?: boolean;
    indeterminateAnimationDuration?: number;
    strokeWidth?: number;
    trackColor?: string;
    useNativeDriver?: boolean;
    animationType?: 'decay' | 'spring' | 'timing';
    animationConfig?: object;
    color?: string;
    style?: StyleProp<ViewStyle>;
    formatText?: (progress: number) => string;
    showText?: boolean;
    allowFontScaling?: boolean;
    textStyle?: StyleProp<TextStyle>;
};

const Circle = (props: Props) => {
    const {
        animated = true,
        progress,
        indeterminate = false,
        indeterminateAnimationDuration = 1000,
        strokeWidth = 6,
        color = 'colors.primary',
        useNativeDriver = true,
        animationType = 'spring',
        trackColor = 'colors.surfaceVariant',
        animationConfig = { bounciness: 0 },
        style: styleProp,
        formatText = (progress: number) => `${Math.round(progress)}%`,
        showText = false,
        allowFontScaling = true,
        textStyle,
    } = props;
    const { View, Text } = useMolecules();

    const [size, setSize] = React.useState(-1);

    const componentStyle = useComponentStyles(
        'ProgressIndicator',
        [styleProp, { strokeColor: color, trackColor: trackColor }],
        {
            variant: 'circle',
        },
    );
    const showTextStyle = React.useMemo(() => {
        const border = 0;
        const textOffset = border + strokeWidth;
        const textSize = size - textOffset * 2;
        return {
            container: [
                styles.textContainer,
                {
                    left: textOffset,
                    top: textOffset,
                    width: textSize,
                    height: textSize,
                    borderRadius: textSize / 2,
                },
            ],
            text: [
                {
                    color,
                    fontSize: textSize / 4.5,
                },
                textStyle,
            ],
        };
    }, [strokeWidth, size, textStyle]);
    const { containerStyle, progressStyle, strokeColor, strokeTrackColor } = React.useMemo(() => {
        const { trackColor, strokeColor, ...restStyle } = componentStyle;

        const width = size === -1 ? '100%' : size;
        return {
            strokeTrackColor: trackColor,
            strokeColor,
            containerStyle: {
                width: width,
                height: width,
                ...styles.container,
                ...restStyle,
            },
            progressStyle: {
                ...styles.svg,
            },
        };
    }, [size, componentStyle]);

    const progressAnim = React.useRef(new Animated.Value(1)).current;
    const [progressValue, setProgressValue] = React.useState(0);

    const { r, cx, cy } = React.useMemo(() => {
        const sizeCalc = size === -1 ? 150 : size;
        return { r: (sizeCalc - strokeWidth) / 2, cx: sizeCalc / 2, cy: sizeCalc / 2 };
    }, [size, strokeWidth]);

    const circumference = r * 2 * PI;
    const α = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, PI * 2],
    });

    const handleLayout = React.useCallback((event: LayoutChangeEvent) => {
        setSize(event.nativeEvent.layout.width);
    }, []);

    const animate = React.useCallback(() => {
        progressAnim.setValue(1);
        Animated.sequence([
            Animated.timing(progressAnim, {
                toValue: 0,
                duration: indeterminateAnimationDuration,
                easing: Easing.circle,
                isInteraction: false,

                useNativeDriver: useNativeDriver,
            }),
            Animated.timing(progressAnim, {
                toValue: -1,
                duration: indeterminateAnimationDuration,
                easing: Easing.circle,
                isInteraction: false,

                useNativeDriver: useNativeDriver,
            }),
        ]).start(endState => {
            if (endState.finished) {
                animate();
            }
        });
    }, [indeterminateAnimationDuration, useNativeDriver]);

    React.useEffect(() => {
        if (indeterminate) {
            animate();
        } else {
            progressAnim.addListener(event => setProgressValue(100 - event.value * 100));
        }
    }, [indeterminate]);

    React.useEffect(() => {
        if (!indeterminate) {
            const newProgress = Math.min(Math.max(progress / 100, 0), 1) / 1;
            if (animated) {
                Animated[animationType](progressAnim, {
                    toValue: 1 - newProgress,
                    useNativeDriver: useNativeDriver,
                    velocity: 0,
                    ...animationConfig,
                }).start();
            } else {
                progressAnim.setValue(newProgress);
            }
        }
    }, [progress]);

    const strokeDashoffset = multiply(α, r);
    return (
        <View style={containerStyle} onLayout={handleLayout}>
            <Svg width="100%" height="100%" style={progressStyle}>
                <Defs>
                    {/* @ts-ignore */}
                    <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
                        <Stop offset="0" stopColor={strokeColor} />
                    </LinearGradient>
                </Defs>
                <CircleSvg
                    stroke={strokeTrackColor}
                    fill="none"
                    {...{
                        strokeWidth,
                        cx,
                        cy,
                        r,
                    }}
                />
                <AnimatedCircle
                    stroke="url(#grad)"
                    fill="none"
                    strokeDasharray={`${circumference}, ${circumference}`}
                    {...{
                        strokeDashoffset,
                        strokeWidth,
                        cx,
                        cy,
                        r,
                    }}
                />
            </Svg>
            {!indeterminate && showText ? (
                <View style={showTextStyle.container}>
                    <Text style={showTextStyle.text} allowFontScaling={allowFontScaling}>
                        {formatText(progressValue)}
                    </Text>
                </View>
            ) : (
                false
            )}
        </View>
    );
};

export default React.memo(Circle);

const styles = StyleSheet.create({
    container: {
        borderRadius: 9999999,
        overflow: 'hidden',
    },
    svg: {
        transform: [{ rotateZ: '270deg' }],
    },
    textContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
