import { memo, useEffect, useMemo, useRef } from 'react';
import { ViewStyle, Animated } from 'react-native';
import { useComponentStyles, useMolecules } from '../../hooks';
import { CallbackActionState, withActionState } from '../../hocs';
import type { MD3Elevation } from '../../core/theme/types';
import type { TouchableRippleProps } from '../TouchableRipple';

export type Props = TouchableRippleProps &
    CallbackActionState & {
        variant?: 'elevated' | 'outlined' | 'filled';
        containerStyle?: ViewStyle;
        elevation?: MD3Elevation;
    };

const Card = ({
    variant = 'elevated',
    hovered,
    pressed,
    disabled,
    style,
    children,
    elevation: elevationProp,
    ...rest
}: Props) => {
    const { Surface, TouchableRipple } = useMolecules();
    const componentStyles = useComponentStyles('Card', style, {
        variant,
        states: {
            disabled: !!disabled,
            pressed: !!pressed,
            hovered: !!hovered,
        },
    });

    const initialElevation =
        elevationProp === undefined ? (variant === 'elevated' ? 1 : 0) : elevationProp;

    const { current: elevation } = useRef<Animated.Value>(new Animated.Value(initialElevation));

    const styles = useMemo(() => {
        const { container, innerContainer, animationDuration, ...restStyles } = componentStyles;

        return {
            container,
            innerContainer: [innerContainer, restStyles],
            animationDuration,
        };
    }, [componentStyles]);

    useEffect(() => {
        if (variant === 'outlined') return;

        Animated.timing(elevation, {
            toValue: hovered ? (variant === 'elevated' ? 2 : 1) : initialElevation,
            duration: styles.animationDuration,
            useNativeDriver: false,
        }).start();
    }, [variant, elevation, hovered, initialElevation, styles.animationDuration]);

    return (
        <Surface style={styles.container} elevation={elevation}>
            <TouchableRipple style={styles.innerContainer} {...rest} disabled={disabled}>
                {children}
            </TouchableRipple>
        </Surface>
    );
};

export default memo(withActionState(Card));
