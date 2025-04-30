import { ReactNode, memo, useMemo, forwardRef } from 'react';
import { View, StyleProp, ViewStyle, ViewProps } from 'react-native';

import type { MD3Elevation } from '../../types/theme';
import shadow from '../../styles/shadow';
import { defaultStyles } from './utils';
import { BackgroundContextWrapper } from './BackgroundContextWrapper';

export type Props = ViewProps & {
    /**
     * Content of the `Surface`.
     */
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
    elevation?: MD3Elevation;
    backgroundColor?: string;
    /**
     * TestID used for testing purposes
     */
    testID?: string;
};

// for Web
const Surface = (
    { elevation = 1, style, children, testID, backgroundColor, ...props }: Props,
    ref: any,
) => {
    const { surfaceStyle } = useMemo(() => {
        return {
            surfaceStyle: [
                elevation ? shadow(elevation) : null,
                defaultStyles.root,
                style,
                backgroundColor ? { backgroundColor } : {},
            ] as StyleProp<ViewStyle>,
        };
    }, [backgroundColor, elevation, style]);

    return (
        <BackgroundContextWrapper backgroundColor={backgroundColor!}>
            <View ref={ref} {...props} testID={testID} style={surfaceStyle}>
                {children}
            </View>
        </BackgroundContextWrapper>
    );
};

export default memo(forwardRef(Surface));
