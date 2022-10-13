import { Animated, Easing, StyleProp } from 'react-native';
import { useMemo } from 'react';

const AnimatedSpinner = ({
    index,
    size,
    color,
    timer,
    duration,
    styles,
}: {
    index: number;
    size: number;
    timer: Animated.Value;
    duration: number;
    color: string;
    styles: StyleProp<any>;
}) => {
    const containerStyle = {
        width: size,
        height: size / 2,
        overflow: 'hidden' as const,
    };

    const frames = (60 * duration) / 1000;
    const easing = Easing.bezier(0.4, 0.0, 0.7, 1.0);
    const inputRange = useMemo(
        () => Array.from(new Array(frames), (_, frameIndex) => frameIndex / (frames - 1)),
        [frames],
    );
    const outputRange = useMemo(
        () =>
            Array.from(new Array(frames), (_, frameIndex) => {
                let progress = (2 * frameIndex) / (frames - 1);
                const rotation = index ? +(360 - 15) : -(180 - 15);

                if (progress > 1.0) {
                    progress = 2.0 - progress;
                }

                const direction = index ? -1 : +1;

                return `${direction * (180 - 30) * easing(progress) + rotation}deg`;
            }),
        [easing, frames, index],
    );

    const layerStyle = {
        width: size,
        height: size,
        transform: [
            {
                rotate: timer.interpolate({
                    inputRange: [0, 1],
                    outputRange: [`${0 + 30 + 15}deg`, `${2 * 360 + 30 + 15}deg`],
                }),
            },
        ],
    };

    const viewportStyle = {
        width: size,
        height: size,
        transform: [
            {
                translateY: index ? -size / 2 : 0,
            },
            {
                rotate: timer.interpolate({ inputRange, outputRange }),
            },
        ],
    };

    const offsetStyle = index ? { top: size / 2 } : null;

    const lineStyle = {
        width: size,
        height: size,
        borderColor: color,
        borderWidth: size / 10,
        borderRadius: size / 2,
    };

    return (
        <Animated.View style={[styles.layer]}>
            <Animated.View style={layerStyle}>
                <Animated.View style={[containerStyle, offsetStyle]} collapsable={false}>
                    <Animated.View style={viewportStyle}>
                        <Animated.View style={containerStyle} collapsable={false}>
                            <Animated.View style={lineStyle} />
                        </Animated.View>
                    </Animated.View>
                </Animated.View>
            </Animated.View>
        </Animated.View>
    );
};

export default AnimatedSpinner;
