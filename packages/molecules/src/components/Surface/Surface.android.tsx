import { ComponentPropsWithRef, ReactNode, memo, useMemo } from 'react';
import { Animated, View, StyleProp, ViewStyle } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

// import { useComponentStyles, useCurrentTheme } from '../../hooks';
import { inputRange } from '../../styles/shadow';
import type { MD3Elevation } from '../../types/theme';
import { defaultStyles, extractProperties, getElevationAndroid } from './utils';
import { BackgroundContextWrapper } from './BackgroundContextWrapper';

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
    elevation?: MD3Elevation;
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
const elevationLevel = [0, 1, 2, 6, 8, 12];

const Surface = ({ elevation = 1, style, children, testID, ...props }: Props) => {
    const { theme } = useUnistyles();

    const backgroundColor = (() => {
        // @ts-ignore
        return theme.colors.elevation?.[`level${elevation}`];
    })();

    const { memoizedStyles, surfaceBackground } = useMemo(() => {
        return {
            memoizedStyles: [
                {
                    backgroundColor,
                },
                defaultStyles.root,
                style,
                {
                    elevation: getElevationAndroid(elevation, inputRange, elevationLevel),
                },
            ] as StyleProp<ViewStyle>,
            surfaceBackground: extractProperties(
                [defaultStyles.root as ViewStyle, style],
                ['backgroundColor'],
            ).backgroundColor,
        };
    }, [backgroundColor, elevation, style]);

    return (
        <BackgroundContextWrapper backgroundColor={surfaceBackground}>
            <View {...props} testID={testID} style={memoizedStyles}>
                {children}
            </View>
        </BackgroundContextWrapper>
    );
};

export default memo(Surface);
