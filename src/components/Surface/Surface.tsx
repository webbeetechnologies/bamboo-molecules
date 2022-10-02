import { ComponentPropsWithRef, ReactNode, memo } from 'react';
import { Animated, StyleSheet, View, StyleProp, ViewStyle, Platform } from 'react-native';

import shadow from '../../styles/shadow';
import { isAnimatedValue } from '../../styles/overlay';
import { useCurrentTheme } from '../../hooks';
import type { MD3Elevation } from '../../core/theme/types';
import {
    getElevationAndroid,
    getStyleForAnimatedShadowLayer,
    getStyleForShadowLayer,
} from './utils';

export type Props = ComponentPropsWithRef<typeof View> & {
    /**
     * Content of the `Surface`.
     */
    children: ReactNode;
    style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
    /**
     * @supported Available in v5.x with theme version 3
     * Changes shadows and background on iOS and Android.
     * Used to create UI hierarchy between components.
     *
     * Note: In version 2 the `elevation` prop was accepted via `style` prop i.e. `style={{ elevation: 4 }}`.
     * It's no longer supported with theme version 3 and you should use `elevation` property instead.
     */
    elevation?: 0 | 1 | 2 | 3 | 4 | 5 | Animated.Value;
    /**
     * TestID used for testing purposes
     */
    testID?: string;
};

/**
 * Surface is a basic container that can give depth to an element with elevation shadow.
 * On dark theme with `adaptive` mode, surface is constructed by also placing a semi-transparent white overlay over a component surface.
 * See [Dark Theme](https://callstack.github.io/react-native-paper/theming.html#dark-theme) for more information.
 * Overlay and shadow can be applied by specifying the `elevation` property both on Android and iOS.
 *
 * <div class="screenshots">
 *   <figure>
 *     <img class="medium" src="screenshots/surface-android.png" />
 *     <figcaption>Surface on Android</figcaption>
 *   </figure>
 *   <figure>
 *     <img class="medium" src="screenshots/surface-ios.png" />
 *     <figcaption>Surface on iOS</figcaption>
 *   </figure>
 * </div>
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Surface, Text } from 'react-native-paper';
 * import { StyleSheet } from 'react-native';
 *
 * const MyComponent = () => (
 *   <Surface style={styles.surface} elevation={4}>
 *      <Text>Surface</Text>
 *   </Surface>
 * );
 *
 * export default MyComponent;
 *
 * const styles = StyleSheet.create({
 *   surface: {
 *     padding: 8,
 *     height: 80,
 *     width: 80,
 *     alignItems: 'center',
 *     justifyContent: 'center',
 *   },
 * });
 * ```
 */
const Surface = ({ elevation = 1, children, style, testID, ...props }: Props) => {
    const theme = useCurrentTheme();

    const inputRange = [0, 1, 2, 3, 4, 5];

    const backgroundColor = (() => {
        if (isAnimatedValue(elevation)) {
            return elevation.interpolate({
                inputRange,
                outputRange: inputRange.map(el => {
                    // @ts-ignore
                    return theme.colors.elevation?.[`level${el as MD3Elevation}`];
                }),
            });
        }

        // @ts-ignore
        return theme.colors.elevation?.[`level${elevation}`];
    })();

    if (Platform.OS === 'web') {
        return (
            <Animated.View
                {...props}
                testID={testID}
                style={[{ backgroundColor }, elevation ? shadow(elevation) : null, style]}>
                {children}
            </Animated.View>
        );
    }

    if (Platform.OS === 'android') {
        const elevationLevel = [0, 3, 6, 9, 12, 15];

        const { margin, padding, transform, borderRadius } = (StyleSheet.flatten(style) ||
            {}) as ViewStyle;

        const outerLayerStyles = { margin, padding, transform, borderRadius };
        const sharedStyle = [{ backgroundColor }, style];

        return (
            <Animated.View
                {...props}
                testID={testID}
                style={[
                    {
                        backgroundColor,
                        transform,
                    },
                    outerLayerStyles,
                    sharedStyle,
                    {
                        elevation: getElevationAndroid(elevation, inputRange, elevationLevel),
                    },
                ]}>
                {children}
            </Animated.View>
        );
    }

    const { position, alignSelf, top, left, right, bottom, ...restStyle } = (StyleSheet.flatten(
        style,
    ) || {}) as ViewStyle;

    const absoluteStyles = { position, alignSelf, top, right, bottom, left };
    const sharedStyle = [{ backgroundColor }, restStyle];

    if (isAnimatedValue(elevation)) {
        return (
            <Animated.View style={[getStyleForAnimatedShadowLayer(0, elevation), absoluteStyles]}>
                <Animated.View style={getStyleForAnimatedShadowLayer(1, elevation)}>
                    <Animated.View {...props} testID={testID} style={sharedStyle}>
                        {children}
                    </Animated.View>
                </Animated.View>
            </Animated.View>
        );
    }

    return (
        <Animated.View style={[getStyleForShadowLayer(0, elevation), absoluteStyles]}>
            <Animated.View style={[getStyleForShadowLayer(1, elevation)]}>
                <Animated.View {...props} testID={testID} style={sharedStyle}>
                    {children}
                </Animated.View>
            </Animated.View>
        </Animated.View>
    );
};

export default memo(Surface);
