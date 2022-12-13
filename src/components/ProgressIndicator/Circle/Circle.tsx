import {
    memo,
    useState,
    useCallback,
    useMemo,
    useRef,
    useEffect,
    forwardRef,
    ReactNode,
} from 'react';
import {
    StyleSheet,
    ViewStyle,
    StyleProp,
    LayoutChangeEvent,
    Easing,
    TextStyle,
} from 'react-native';
import Svg, { Circle as CircleSvg } from 'react-native-svg';
import { Animated } from 'react-native';
import { useComponentStyles, useMolecules } from '../../../hooks';

const { multiply } = Animated;

const AnimatedCircle = Animated.createAnimatedComponent(CircleSvg);
const { PI } = Math;

type ProgressTextRefProps = {
    setProgress: (progress: number) => void;
};

export type Props = {
    progress: number;
    animated?: boolean;
    indeterminate?: boolean;
    thickness?: number;
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
        useNativeDriver = true,
        animationType = 'spring',
        animationConfig = { bounciness: 0 },
        style: styleProp,
        formatText = (progress: number) => `${Math.round(progress)}%`,
        showText = false,
        allowFontScaling = true,
        ...rest
    } = props;
    const { View } = useMolecules();

    const [size, setSize] = useState(48);
    const progressAnim = useRef(new Animated.Value(1)).current;
    const progressTextRef = useRef<ProgressTextRefProps>();

    const componentStyle = useComponentStyles('ProgressCircle', [
        styleProp,
        rest.color ? { color: rest.color } : {},
        rest.trackColor ? { trackColor: rest.trackColor } : {},
        rest.textStyle ? { text: rest.textStyle } : {},
        rest.thickness ? { thickness: rest.thickness } : {},
    ]);
    const {
        containerStyle,
        progressStyle,
        strokeColor,
        strokeTrackColor,
        animationScale,
        thickness,
    } = useMemo(() => {
        const { trackColor, color, width, animationScale, thickness, ...restStyle } =
            componentStyle;

        return {
            strokeTrackColor: trackColor,
            strokeColor: color,
            animationScale,
            thickness,
            containerStyle: {
                width: width,
                height: width,
                ...styles.container,
                ...restStyle,
            },
            progressStyle: styles.svg,
        };
    }, [componentStyle]);

    const showTextStyle = useMemo(() => {
        const { text, thickness } = componentStyle;
        const border = 0;
        const textOffset = border + thickness;
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
                    fontSize: textSize / 3.5,
                },
                text,
            ],
        };
    }, [size, componentStyle]);

    const { r, cx, cy, circumference, strokeDashoffset } = useMemo(() => {
        const r = (size - thickness) / 2;
        const alpha = progressAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, PI * 2],
        });
        return {
            r,
            cx: size / 2,
            cy: size / 2,
            circumference: r * 2 * PI,
            strokeDashoffset: multiply(alpha, r),
        };
    }, [size, thickness]);

    const handleLayout = useCallback((event: LayoutChangeEvent) => {
        setSize(event.nativeEvent.layout.width);
    }, []);

    const indeterminateAnim = useCallback(() => {
        progressAnim.setValue(1);
        Animated.sequence([
            Animated.timing(progressAnim, {
                toValue: 0,
                duration: 1000 * animationScale,
                easing: Easing.circle,
                isInteraction: false,

                useNativeDriver: useNativeDriver,
            }),
            Animated.timing(progressAnim, {
                toValue: -1,
                duration: 1000 * animationScale,
                easing: Easing.circle,
                isInteraction: false,

                useNativeDriver: useNativeDriver,
            }),
        ]).start(endState => {
            if (endState.finished) {
                indeterminateAnim();
            }
        });
    }, [animationScale, useNativeDriver]);

    useEffect(() => {
        if (indeterminate) {
            indeterminateAnim();
        } else {
            progressAnim.addListener(event =>
                progressTextRef?.current?.setProgress(100 - event.value * 100),
            );
        }
        return () => {
            // progressAnim.removeListener();
        };
    }, [indeterminate]);

    useEffect(() => {
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

    return (
        <View style={containerStyle} onLayout={handleLayout}>
            <Svg width="100%" height="100%" style={progressStyle}>
                <CircleSvg
                    stroke={strokeTrackColor}
                    fill="none"
                    {...{
                        strokeWidth: thickness,
                        cx,
                        cy,
                        r,
                    }}
                />
                <AnimatedCircle
                    stroke={strokeColor}
                    fill="none"
                    strokeDasharray={`${circumference}, ${circumference}`}
                    {...{
                        strokeDashoffset,
                        strokeWidth: thickness,
                        cx,
                        cy,
                        r,
                    }}
                />
            </Svg>
            {!indeterminate && showText ? (
                <View style={showTextStyle.container}>
                    <TextComponent
                        ref={progressTextRef}
                        style={showTextStyle.text}
                        allowFontScaling={allowFontScaling}>
                        {value => formatText(value)}
                    </TextComponent>
                </View>
            ) : (
                false
            )}
        </View>
    );
};

export default memo(Circle);

type TextComponentProps = {
    children?: (progress: number) => React.ReactNode | string;
    style?: StyleProp<TextStyle>;
    allowFontScaling: boolean;
};
type Ref = any;

const TextComponent = memo(
    forwardRef((props: TextComponentProps, ref: Ref) => {
        const { children = (progress: number) => progress, ...rest } = props;
        const { Text } = useMolecules();
        const [progress, setProgress] = useState(0);

        const updateProgress = useCallback((value: number) => setProgress(value), []);

        const setRef = useCallback(
            (node: ReactNode) => {
                ref.current = node;
                if (ref.current) ref.current.setProgress = updateProgress;
            },
            [ref, updateProgress],
        );

        return (
            // @ts-ignore
            <Text {...rest} ref={setRef}>
                {children(progress)}
            </Text>
        );
    }),
);

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
