import { memo, useCallback, useEffect, useRef } from 'react';
import { Animated, Easing, Platform, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import type { ActivityIndicatorProps } from '@webbee/bamboo-atoms';
import { useCurrentTheme, useMolecules } from '../../hooks';
import { withNormalizedStyleProp } from '../../hocs';
import AnimatedSpinner from './AnimatedSpinner';

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
    style?: StyleProp<ViewStyle>;
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
    color: indicatorColor,
    hidesWhenStopped = true,
    size: indicatorSize = 'small',
    style,
    ...rest
}: Props) => {
    const { View } = useMolecules();
    const theme = useCurrentTheme();

    const { current: timer } = useRef<Animated.Value>(new Animated.Value(0));
    const { current: fade } = useRef<Animated.Value>(
        new Animated.Value(!animating && hidesWhenStopped ? 0 : 1),
    );

    const rotation = useRef<Animated.CompositeAnimation | undefined>(undefined);

    const {
        animation: { scale },
    } = theme;

    const color = indicatorColor || theme.colors.primary;
    const size = mapIndicatorSize(indicatorSize);

    const startRotation = useCallback(() => {
        // Show indicator
        Animated.timing(fade, {
            duration: 200 * scale,
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
    }, [scale, fade, timer]);

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
                duration: 200 * scale,
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
    }, [animating, fade, hidesWhenStopped, startRotation, scale, timer]);

    return (
        <View
            style={[styles.container, style]}
            {...rest}
            accessible
            accessibilityRole="progressbar"
            accessibilityState={{ busy: animating }}>
            <Animated.View
                style={[{ width: size, height: size, opacity: fade }]}
                collapsable={false}>
                {[0, 1].map(index => {
                    // Thanks to https://github.com/n4kz/react-native-indicators for the great work
                    return (
                        <AnimatedSpinner
                            key={index}
                            index={index}
                            size={size}
                            color={color}
                            timer={timer}
                            styles={styles}
                            duration={DURATION}
                        />
                    );
                })}
            </Animated.View>
        </View>
    );
};

const styles = {
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    layer: {
        ...StyleSheet.absoluteFillObject,

        justifyContent: 'center',
        alignItems: 'center',
    },
};

export default memo(withNormalizedStyleProp(ActivityIndicator));
