import { Animated } from 'react-native';
import type { MD3Elevation } from '../core/theme/types';
import { MD3Colors } from './themes/tokens';

const MD3_SHADOW_OPACITY = 0.3;
const MD3_SHADOW_COLOR = MD3Colors.primary0;

export const inputRange: MD3Elevation[] = [0, 1, 2, 3, 4, 5];
export const shadowHeight = [0, 1, 2, 4, 6, 8];
export const shadowRadius = [0, 3, 6, 8, 10, 12];

export default function shadow(elevation: number | Animated.Value = 0) {
    if (elevation instanceof Animated.Value) {
        return {
            shadowColor: MD3_SHADOW_COLOR,
            shadowOffset: {
                width: new Animated.Value(0),
                height: elevation.interpolate({
                    inputRange,
                    outputRange: shadowHeight,
                }),
            },
            shadowOpacity: elevation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, MD3_SHADOW_OPACITY],
                extrapolate: 'clamp',
            }),
            shadowRadius: elevation.interpolate({
                inputRange,
                outputRange: shadowRadius,
            }),
        };
    } else {
        return {
            shadowColor: MD3_SHADOW_COLOR,
            shadowOpacity: elevation ? MD3_SHADOW_OPACITY : 0,
            shadowOffset: {
                width: 0,
                height: shadowHeight[elevation],
            },
            shadowRadius: shadowRadius[elevation],
        };
    }
}
