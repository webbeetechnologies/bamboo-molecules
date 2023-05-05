import type { ViewProps } from 'react-native';

export type IFadeProps = ViewProps & {
    in?: boolean;
    entryDuration?: number;
    exitDuration?: number;
    delay?: number;
};
export type IScaleFadeProps = ViewProps & {
    in?: boolean;
    duration?: number;
    delay?: number;
    initialScale?: number;
};
export type ISlideProps = ViewProps & {
    in?: boolean;
    duration?: number;
    delay?: number;
    placement?: 'top' | 'bottom' | 'right' | 'left';
    overlay?: boolean;
};
export type ISlideFadeProps = ViewProps & {
    in?: boolean;
    delay?: number;
    duration?: number;
    offsetX?: number;
    offsetY?: number;
};

export interface ISupportedTransitions {
    opacity?: number;
    translateY?: number;
    translateX?: number;
    scale?: number;
    scaleX?: number;
    scaleY?: number;
    rotate?: string;
}

export interface ITransitionConfig {
    type?: 'timing' | 'spring';
    easing?: (value: number) => number;
    overshootClamping?: boolean;
    restDisplacementThreshold?: number;
    restSpeedThreshold?: number;
    velocity?: number | { x: number; y: number };
    bounciness?: number;
    speed?: number;
    tension?: number;
    friction?: number;
    stiffness?: number;
    mass?: number;
    damping?: number;
    delay?: number;
    duration?: number;
    useNativeDriver?: boolean;
}

export interface ITransitionStyleProps extends ISupportedTransitions {
    transition?: ITransitionConfig;
}

export interface TransitionProps extends ViewProps {
    /**
     * Callback invoked when transition is completed
     */
    onTransitionComplete?: (s: 'entered' | 'exited') => any;
    /**
     * Styles before the transition starts
     */
    initial?: ISupportedTransitions;
    /**
     * Entry animation styles
     */
    animate?: ITransitionStyleProps;
    /**
     * Exit animation styles
     */
    exit?: ITransitionStyleProps;
    /**
     * Determines whether to start the animation
     */
    visible?: boolean;

    animationExited?: boolean;
    children?: any;
    as?: any;
}
