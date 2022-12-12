import { useRef, useEffect, useCallback } from 'react';
import { Animated, Easing } from 'react-native';

type Props = {
    animated: boolean;
    direction: 'clockwise' | 'counter-clockwise';
    indeterminate: boolean;
    indeterminateAnimationDuration: number;
    progress: number;
    indeterminateProgress: number;
};

const useCircleAnimation = (props: Props) => {
    const {
        animated = true,
        indeterminateAnimationDuration = 1000,
        indeterminate = false,
        progress = 0,
        indeterminateProgress,
        direction,
    } = props;
    let progressValue = Math.min(Math.max(progress / 1000, 0), 1);
    let rotationValue = 0;

    const progressAnim = useRef(new Animated.Value(progressValue)).current;
    const rotationAnim = useRef(new Animated.Value(rotationValue)).current;

    const spin = useCallback(() => {
        rotationAnim.setValue(0);
        Animated.timing(rotationAnim, {
            toValue: direction === 'counter-clockwise' ? -1 : 1,
            duration: indeterminateAnimationDuration,
            easing: Easing.linear,
            isInteraction: false,
            useNativeDriver: false,
        }).start(endState => {
            if (endState.finished) {
                spin();
            }
        });
    }, [direction, indeterminateAnimationDuration]);

    useEffect(() => {
        progressAnim.addListener(event => {
            progressValue = event.value;
        });
        rotationAnim.addListener(event => {
            rotationValue = event.value;
        });
        if (indeterminate) {
            spin();
            if (indeterminateProgress) {
                Animated.spring(progressAnim, {
                    toValue: indeterminateProgress,
                    useNativeDriver: false,
                }).start();
            }
        }
        return () => {
            progressAnim.removeAllListeners();
            rotationAnim.removeAllListeners();
        };
    }, []);
    useEffect(() => {
        if (indeterminate) {
            spin();
        } else {
            Animated.spring(rotationAnim, {
                toValue: rotationValue > 0.5 ? 1 : 0,
                useNativeDriver: false,
            }).start(endState => {
                if (endState.finished) {
                    rotationAnim.setValue(0);
                }
            });
        }

        const newProgress = indeterminate
            ? indeterminateProgress || 0
            : Math.min(Math.max(progress / 100, 0), 1);

        if (newProgress !== progressValue) {
            if (animated) {
                Animated.spring(progressAnim, {
                    toValue: newProgress,
                    bounciness: 0,
                    useNativeDriver: false,
                }).start();
            } else {
                progressAnim.setValue(progress);
            }
        }
    }, [indeterminate, progress]);

    return { progressAnim: animated ? progressAnim : progress, rotationAnim: rotationAnim };
};

export default useCircleAnimation;
