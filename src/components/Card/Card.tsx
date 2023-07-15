import { forwardRef, memo, useEffect, useMemo, useRef } from 'react';
import { ViewStyle, Animated } from 'react-native';
import { useComponentStyles, useMolecules } from '../../hooks';
import { CallbackActionState, withActionState } from '../../hocs';
import type { MD3Elevation } from '../../core/theme/types';
import type { TouchableRippleProps } from '../TouchableRipple';

export type Props = TouchableRippleProps &
    CallbackActionState & {
        variant?: 'elevated' | 'outlined' | 'filled';
        touchableContainerStyle?: ViewStyle;
        elevation?: MD3Elevation;
        disableOnHoverElevation?: boolean;
    };

const emptyObj = {};

const Card = (
    {
        variant = 'elevated',
        hovered,
        pressed,
        disabled,
        style,
        elevation: elevationProp,
        children,
        touchableContainerStyle = emptyObj,
        disableOnHoverElevation = false,
        ...rest
    }: Props,
    ref: any,
) => {
    const { Surface, TouchableRipple } = useMolecules();
    const componentStyles = useComponentStyles(
        'Card',
        [
            style,
            {
                innerContainer: touchableContainerStyle,
            },
        ],
        {
            variant,
            states: {
                disabled: !!disabled,
                pressed: !!pressed,
                hovered: !!hovered,
            },
        },
    );

    const initialElevation = useMemo(
        () => (elevationProp === undefined ? (variant === 'elevated' ? 1 : 0) : elevationProp),
        [elevationProp, variant],
    );

    const { current: elevation } = useRef<Animated.Value>(new Animated.Value(initialElevation));

    const styles = useMemo(() => {
        const { container, innerContainer, animationDuration, ...restStyles } = componentStyles;

        return {
            container: [container, restStyles],
            innerContainer: innerContainer,
            animationDuration,
        };
    }, [componentStyles]);

    useEffect(() => {
        if (disabled || !rest?.onPress) return;

        Animated.timing(elevation, {
            toValue: hovered && !disableOnHoverElevation ? initialElevation + 1 : initialElevation,
            duration: styles.animationDuration,
            useNativeDriver: false,
        }).start();
    }, [
        disableOnHoverElevation,
        variant,
        elevation,
        hovered,
        initialElevation,
        styles.animationDuration,
        disabled,
        rest?.onPress,
    ]);

    return (
        <Surface style={styles.container} elevation={elevation}>
            <TouchableRipple style={styles.innerContainer} {...rest} disabled={disabled} ref={ref}>
                <>{children}</>
            </TouchableRipple>
        </Surface>
    );
};

export default memo(withActionState(forwardRef(Card)));
