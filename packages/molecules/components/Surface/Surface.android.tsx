import { ComponentPropsWithRef, ReactNode, forwardRef, memo, useMemo } from 'react';
import { Animated, View, StyleProp, ViewStyle } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';

import { inputRange } from '../../styles/shadow';
import type { MD3Elevation } from '../../types/theme';
import { defaultStyles, extractProperties, getElevationAndroid } from './utils';
import { BackgroundContextWrapper } from './BackgroundContextWrapper';

export type Props = ComponentPropsWithRef<typeof View> & {
    /**
     * Content of the `Surface`.
     */
    children: ReactNode;
    backgroundColor?: string;
    style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
    elevation?: MD3Elevation;
    /**
     * TestID used for testing purposes
     */
    testID?: string;
};

const elevationLevel = [0, 1, 2, 6, 8, 12];

const Surface = ({ elevation = 1, style, children, testID, ...props }: Props, ref: any) => {
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
            <View ref={ref} {...props} testID={testID} style={memoizedStyles}>
                {children}
            </View>
        </BackgroundContextWrapper>
    );
};

export default memo(forwardRef(Surface));
