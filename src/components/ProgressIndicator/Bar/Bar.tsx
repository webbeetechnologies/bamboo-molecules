import {
    Animated,
    Easing,
    I18nManager,
    LayoutChangeEvent,
    StyleProp,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useMolecules, useComponentStyles } from '../../../hooks';

export type Props = {
    trackColor?: string;
    animated?: boolean;
    children?: React.ReactNode;
    color?: string;
    indeterminate?: boolean;
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
        progress = 0,
        useNativeDriver = false,
        animationConfig = { bounciness: 0 },
        animationType = 'spring',
        style: styleProp,
        ...rest
    } = props;

    const { View } = useMolecules();

    const componentStyle = useComponentStyles('ProgressBar', [
        styleProp,
        rest.color ? { color: rest.color } : {},
        rest.trackColor ? { backgroundColor: rest.trackColor } : {},
    ]);

    const [widthBar, setWidthBar] = useState(0);

    const progressCalc = useRef(new Animated.Value(0)).current;

    const { containerStyle, progressStyle, animationScale } = useMemo(() => {
        const innerWidth = Math.max(0, widthBar);
        const { color, trackColor, animationScale, height, ...restStyle } = componentStyle;
        const progressColor = restStyle.color ? restStyle.color : color;
        return {
            animationScale,
            containerStyle: {
                ...Styles.containerStyle,
                height,
                backgroundColor: trackColor,
                ...restStyle,
            },

            progressStyle: {
                ...Styles.progressStyle,
                backgroundColor: progressColor,
                transform: [
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
    }, [widthBar, componentStyle, progressCalc]);

    const handleLayout = useCallback((event: LayoutChangeEvent) => {
        setWidthBar(event.nativeEvent.layout.width);
    }, []);

    const indeterminateAnim = useCallback(() => {
        progressCalc.setValue(0);

        Animated.timing(progressCalc, {
            toValue: 1,
            duration: 1000 * animationScale,
            easing: Easing.linear,
            isInteraction: false,
            useNativeDriver: useNativeDriver,
        }).start(endState => {
            if (endState.finished) {
                indeterminateAnim();
            }
        });
    }, [progressCalc, animationScale, useNativeDriver]);

    useEffect(() => {
        if (indeterminate) {
            indeterminateAnim();
        }
    }, [indeterminate, indeterminateAnim]);

    useEffect(() => {
        if (!indeterminate) {
            const newProgress = Math.min(Math.max(progress / 100, 0), 1);

            if (animated) {
                Animated[animationType](progressCalc, {
                    toValue: newProgress,
                    useNativeDriver: useNativeDriver,
                    velocity: 0,
                    ...animationConfig,
                }).start();
            } else {
                progressCalc.setValue(newProgress);
            }
        }
    }, [
        animated,
        animationConfig,
        animationType,
        indeterminate,
        progress,
        progressCalc,
        useNativeDriver,
    ]);

    return (
        <View style={containerStyle} {...rest} onLayout={handleLayout}>
            <Animated.View style={progressStyle} />
            {rest.children}
        </View>
    );
};

export default memo(Bar);

const Styles = StyleSheet.create({
    containerStyle: {
        width: '100%',
        overflow: 'hidden' as 'hidden',
    },
    progressStyle: {
        height: '100%',
    },
});
