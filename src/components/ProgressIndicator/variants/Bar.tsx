import {
    Animated,
    Easing,
    I18nManager,
    LayoutChangeEvent,
    StyleProp,
    ViewStyle,
} from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useMolecules, useComponentStyles } from '../../../hooks';

const INDETERMINATE_WIDTH_FACTOR = 0.3;
const BAR_WIDTH_ZERO_POSITION = INDETERMINATE_WIDTH_FACTOR / (1 + INDETERMINATE_WIDTH_FACTOR);

export type Props = {
    animated?: boolean;
    children?: React.ReactNode;
    color?: string;
    indeterminate?: boolean;
    indeterminateAnimationDuration?: number;
    onLayout?: Function;
    progress: number;
    style?: StyleProp<ViewStyle>;
    useNativeDriver?: boolean;
    animationConfig?: object;
    animationType?: 'decay' | 'timing' | 'spring';
};

const Bar = (props: Props) => {
    const {
        animated = true,
        indeterminate = false,
        indeterminateAnimationDuration = 1000,
        progress = 0,
        useNativeDriver = false,
        animationConfig = { bounciness: 0 },
        animationType = 'spring',
        style: styleProp,
        ...rest
    } = props;

    const { View } = useMolecules();

    const componentStyle = useComponentStyles(
        'ProgressIndicator',
        { style: styleProp, color: rest.color },
        {
            variant: 'bar',
        },
    );

    const [widthBar, setWidthBar] = useState(0);

    const progressCalc = useRef(new Animated.Value(0)).current;

    const animationValue = useRef(new Animated.Value(BAR_WIDTH_ZERO_POSITION)).current;

    const { containerStyle, progressStyle } = useMemo(() => {
        const innerWidth = Math.max(0, widthBar);
        const { color, trackColor, ...restStyle } = componentStyle;

        return {
            containerStyle: {
                width: '100%',
                height: 6,
                overflow: 'hidden' as 'hidden',
                backgroundColor: trackColor,
                ...restStyle.style,
            },

            progressStyle: {
                backgroundColor: restStyle.color ? restStyle.color : color,
                height: '100%',
                transform: [
                    {
                        translateX: animationValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [innerWidth * -INDETERMINATE_WIDTH_FACTOR, innerWidth],
                        }),
                    },
                    {
                        translateX: progressCalc.interpolate({
                            inputRange: [0, 1],
                            outputRange: [innerWidth / (I18nManager.isRTL ? 2 : -2), 0],
                        }),
                    },
                    {
                        scaleX: progressCalc.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.0001, 1],
                        }),
                    },
                ],
            },
        };
    }, [widthBar, rest.color]);

    const handleLayout = (event: LayoutChangeEvent) => {
        setWidthBar(event.nativeEvent.layout.width);

        rest.onLayout?.(event);
    };

    const animate = () => {
        animationValue.setValue(0);

        Animated.timing(animationValue, {
            toValue: 1,
            duration: indeterminateAnimationDuration,
            easing: Easing.linear,
            isInteraction: false,
            useNativeDriver: useNativeDriver,
        }).start(endState => {
            if (endState.finished) {
                animate();
            }
        });
    };

    useEffect(() => {
        if (indeterminate) {
            animate();
        }
    }, []);

    useEffect(() => {
        if (indeterminate) {
            animate();
        } else {
            Animated.spring(animationValue, {
                toValue: BAR_WIDTH_ZERO_POSITION,
                useNativeDriver: useNativeDriver,
            }).start();
        }
    }, [indeterminate]);

    useEffect(() => {
        const newProgress = indeterminate
            ? INDETERMINATE_WIDTH_FACTOR
            : Math.min(Math.max(progress / 100, 0), 1);

        if (animated) {
            Animated.spring(progressCalc, {
                toValue: newProgress,
                useNativeDriver: useNativeDriver,
                ...animationConfig,
            }).start();
        } else {
            progressCalc.setValue(newProgress);
        }
    }, [indeterminate, progress]);

    return (
        <View style={containerStyle} {...rest} onLayout={handleLayout}>
            <Animated.View style={progressStyle} />
            {rest.children}
        </View>
    );
};

export default Bar;
