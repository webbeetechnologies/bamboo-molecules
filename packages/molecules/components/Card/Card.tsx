import { forwardRef, memo, useMemo } from 'react';
import { ViewStyle } from 'react-native';
import type { MD3Elevation } from '../../types/theme';
import { TouchableRipple, type TouchableRippleProps } from '../TouchableRipple';
import { CardVariant } from './types';
import { resolveStateVariant } from '../../utils';
import { Surface } from '../Surface';
import { cardStyles } from './utils';
import { useActionState } from '../../hooks';

export type Props = TouchableRippleProps & {
    variant?: CardVariant;
    touchableContainerStyle?: ViewStyle;
    elevation?: MD3Elevation;
    disableOnHoverElevation?: boolean;
};

const emptyObj = {};

const Card = (
    {
        variant = 'elevated',
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
    const { hovered, pressed } = useActionState({ ref, actionsToListen: ['hover', 'press'] });
    const state = resolveStateVariant({
        disabled: !!disabled,
        pressed: !!pressed,
        hovered: !!hovered,
    });

    cardStyles.useVariants({
        variant,
        state,
    });

    const elevationLevel = variant === 'elevated' ? (hovered ? 2 : 1) : hovered ? 1 : 0;

    const styles = useMemo(() => {
        return {
            container: [cardStyles.container, cardStyles.root, style],
            innerContainer: [cardStyles.innerContainer, touchableContainerStyle],
        };
    }, [style, touchableContainerStyle]);

    const elevation = elevationProp === undefined ? elevationLevel ?? 0 : elevationProp;

    return (
        <Surface
            style={styles.container}
            elevation={
                (!(disableOnHoverElevation && hovered)
                    ? (elevationProp || 0) + elevationLevel
                    : elevation) as MD3Elevation
            }>
            <TouchableRipple style={styles.innerContainer} {...rest} disabled={disabled} ref={ref}>
                <>{children}</>
            </TouchableRipple>
        </Surface>
    );
};

export default memo(forwardRef(Card));
