import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import {
    Animated,
    Easing,
    Platform,
    View,
    ViewStyle,
    type ActivityIndicatorProps,
} from 'react-native';

import AnimatedSpinner from './AnimatedSpinner';
import { StyleSheet } from 'react-native-unistyles';

export type Props = ActivityIndicatorProps & {
    /**
     * Whether to show the indicator or hide it.
     */
    animating?: boolean;
    /**
     * The color of the spinner.
     */
    color?: string;
    /**
     * Size of the indicator.
     */
    size?: 'small' | 'large' | number;
    /**
     * Whether the indicator should hide when not animating.
     */
    hidesWhenStopped?: boolean;
    style?: ViewStyle;
};

const DURATION = 2400;

const mapIndicatorSize = (indicatorSize: 'small' | 'large' | number | undefined) => {
    if (typeof indicatorSize === 'string') {
        return indicatorSize === 'small' ? 24 : 48;
    }
    return indicatorSize ? indicatorSize : 24;
};

/**
 * Activity indicator is used to present progress of some activity in the app.
 * It can be used as a drop-in for the ActivityIndicator shipped with React Native.
 *
 * <div class="screenshots">
 *   <img src="screenshots/activity-indicator.gif" style="width: 100px;" />
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { ActivityIndicator, MD2Colors } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <ActivityIndicator animating={true} color={MD2Colors.red800} />
 * );
 *
 * export default MyComponent;
 * ```
 */
const ActivityIndicator = ({
    animating = true,
    color: indicatorColorProp,
    hidesWhenStopped = true,
    size: indicatorSize = 'small',
    style: styleProp,
    ...rest
}: Props) => {
    // const componentStyles = useComponentStyles('ActivityIndicator', [
    //     styleProp,
    //     { normalizedIndicatorColorProp: indicatorColorProp },
    // ]);
    const componentStyles = defaultStyles;
    const { current: timer } = useRef<Animated.Value>(new Animated.Value(0));
    const { current: fade } = useRef<Animated.Value>(
        new Animated.Value(!animating && hidesWhenStopped ? 0 : 1),
    );

    const rotation = useRef<Animated.CompositeAnimation | undefined>(undefined);

    const size = mapIndicatorSize(indicatorSize);

    const { color, animationScale, viewStyle, animatedViewStyle } = useMemo(() => {
        const { color: defaultIndicatorColor, animationScale: _animationScale } =
            componentStyles.root;

        return {
            color: indicatorColorProp || defaultIndicatorColor,
            animationScale: _animationScale,
            viewStyle: [componentStyles.container, styleProp],
            animatedViewStyle: [{ width: size, height: size, opacity: fade }],
        };
    }, [
        componentStyles.container,
        componentStyles.root,
        fade,
        indicatorColorProp,
        size,
        styleProp,
    ]);

    const startRotation = useCallback(() => {
        // Show indicator
        Animated.timing(fade, {
            duration: 200 * +animationScale,
            toValue: 1,
            isInteraction: false,
            useNativeDriver: true,
        }).start();

        // Circular animation in loop
        if (rotation.current) {
            timer.setValue(0);
            // $FlowFixMe
            Animated.loop(rotation.current).start();
        }
    }, [animationScale, fade, timer]);

    const stopRotation = () => {
        if (rotation.current) {
            rotation.current.stop();
        }
    };

    useEffect(() => {
        if (rotation.current === undefined) {
            // Circular animation in loop
            rotation.current = Animated.timing(timer, {
                duration: DURATION,
                easing: Easing.linear,
                // Animated.loop does not work if useNativeDriver is true on web
                useNativeDriver: Platform.OS !== 'web',
                toValue: 1,
                isInteraction: false,
            });
        }

        if (animating) {
            startRotation();
        } else if (hidesWhenStopped) {
            // Hide indicator first and then stop rotation
            Animated.timing(fade, {
                duration: 200 * +animationScale,
                toValue: 0,
                useNativeDriver: true,
                isInteraction: false,
            }).start(stopRotation);
        } else {
            stopRotation();
        }

        return () => {
            if (animating) stopRotation();
        };
    }, [animating, fade, hidesWhenStopped, startRotation, animationScale, timer]);

    // console.log({ layer: defaultStyles.layer });

    return (
        <View
            style={viewStyle}
            {...rest}
            accessible
            accessibilityRole="progressbar"
            accessibilityState={{ busy: animating }}>
            <Animated.View style={animatedViewStyle} collapsable={false}>
                {[0, 1].map(index => {
                    // Thanks to https://github.com/n4kz/react-native-indicators for the great work
                    return (
                        <AnimatedSpinner
                            key={index}
                            index={index}
                            size={size}
                            color={color}
                            timer={timer}
                            // style={defaultStyles.layer}
                            duration={DURATION}
                        />
                    );
                })}
            </Animated.View>
        </View>
    );
};

export const defaultStyles = StyleSheet.create(theme => ({
    root: {
        animationScale: theme.animation.scale,
        color: theme.colors.primary,
    } as any,
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    layer: {
        ...StyleSheet.absoluteFillObject,

        justifyContent: 'center',
        alignItems: 'center',
    },
}));

export default memo(ActivityIndicator);
