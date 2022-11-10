/* eslint-disable react-hooks/exhaustive-deps */
import React, { forwardRef } from 'react';
import { Animated } from 'react-native';
import type { ISupportedTransitions, ITransitionConfig, TransitionProps } from './Transition.types';

const transformStylesMap = {
    translateY: true,
    translateX: true,
    scale: true,
    scaleX: true,
    scaleY: true,
    rotate: true,
};

const defaultStyles = {
    opacity: 1,
    translateY: 0,
    translateX: 0,
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    rotate: '0deg',
};

const getAnimatedStyles =
    (animateValue: any) =>
    (
        defaultStyles: ISupportedTransitions,
        initial: ISupportedTransitions,
        to: ISupportedTransitions,
    ) => {
        const styles: any = {
            transform: [],
        };
        for (const key in initial) {
            if (key === 'transition') {
                continue;
            }

            if (key in transformStylesMap) {
                styles.transform?.push({
                    [key]: animateValue.interpolate({
                        inputRange: [0, 1, 2],
                        outputRange: [
                            (defaultStyles as any)[key],
                            (initial as any)[key],
                            (to as any)[key],
                        ],
                    }),
                } as any);
            } else {
                styles[key] = animateValue.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [
                        (defaultStyles as any)[key],
                        (initial as any)[key],
                        (to as any)[key],
                    ],
                });
            }
        }

        return styles;
    };

const defaultTransitionConfig: ITransitionConfig = {
    type: 'timing',
    useNativeDriver: true,
    duration: 250,
    delay: 0,
};

const Transition = forwardRef(
    (
        {
            children,
            onTransitionComplete,
            visible = false,
            initial,
            animate,
            style,
            exit,
            as,
            ...rest
        }: TransitionProps,
        ref: any,
    ) => {
        const animateValue = React.useRef(new Animated.Value(0)).current;

        const Component = React.useMemo(() => {
            if (as) {
                return Animated.createAnimatedComponent(as);
            }

            return Animated.View;
        }, [as]);

        const [animationState, setAnimationState] = React.useState('');

        const prevVisible = React.useRef(visible);

        React.useEffect(() => {
            if (animationState === 'entering' || animationState === 'exiting') {
                const defaultTransition = {
                    ...defaultTransitionConfig,
                    ...animate?.transition,
                };

                const entryTransition = {
                    ...defaultTransitionConfig,
                    ...animate?.transition,
                };

                const exitTransition = {
                    ...defaultTransitionConfig,
                    ...exit?.transition,
                };

                const startAnimation = animationState === 'entering' ? 2 : 1;

                const transition = startAnimation ? entryTransition : exitTransition;

                Animated.sequence([
                    // @ts-ignore - delay is present in defaultTransitionConfig
                    Animated.delay(transition.delay),
                    Animated[transition.type ?? 'timing'](animateValue, {
                        toValue: startAnimation,
                        useNativeDriver: true,
                        ...transition,
                    }),

                    // @ts-ignore - delay is present in defaultTransitionConfig
                    animationState === 'entering'
                        ? Animated.delay(0)
                        : Animated[defaultTransition.type ?? 'timing'](animateValue, {
                              toValue: 0,
                              useNativeDriver: true,
                              ...defaultTransition,
                          }),
                ]).start(({ finished }) => {
                    if (animationState === 'entering') {
                        setAnimationState('entered');
                    } else if (animationState === 'exiting') {
                        // Animated.sequence([
                        //   Animated[transition.type ?? 'timing'](animateValue, {
                        //     toValue: startAnimation,
                        //     useNativeDriver: true,
                        //     ...transition,
                        //   }),
                        // ])
                        setAnimationState('exited');
                    }
                });
                // });
            }

            if (animationState === 'exited') {
                onTransitionComplete && onTransitionComplete('exited');
            } else if (animationState === 'entered') {
                onTransitionComplete && onTransitionComplete('entered');
            }
            // if (animationState === 'entering') {
            //   //
            // }
        }, [animationState, onTransitionComplete]);

        React.useEffect(() => {
            // if (!visible) {
            if (prevVisible.current !== visible && !visible) {
                setAnimationState('exiting');
            }

            if (visible) {
                setAnimationState('entering');
            }
            prevVisible.current = visible;
            // }
        }, [visible]);

        // If exit animation is present and state is exiting, we replace 'initial' with 'exit' animation

        const initialState = exit
            ? { ...defaultStyles, ...exit }
            : { ...defaultStyles, ...initial };

        const animateState = { ...defaultStyles, ...animate };

        const styles = React.useMemo(() => {
            // console.log('display state here', initial);
            return [
                getAnimatedStyles(animateValue)(
                    { ...defaultStyles, opacity: 0 },
                    initialState as ISupportedTransitions,
                    animateState as ISupportedTransitions,
                ),
                style,
            ];
        }, [animateValue, initial, animate, style]);

        return (
            <Component
                // pointerEvents="box-none"
                pointerEvents={!visible ? 'none' : 'box-none'}
                // https://github.com/facebook/react-native/issues/23090#issuecomment-710803743
                // needsOffscreenAlphaCompositing
                // style={[styles]}
                style={[styles]}
                ref={ref}
                {...rest}>
                {children}
            </Component>
        );
    },
);

export default Transition;
