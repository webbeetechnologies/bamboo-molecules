import { forwardRef, memo, useMemo } from 'react';
import { ViewStyle, StyleSheet } from 'react-native';
import { CallbackActionState, withActionState } from '../../hocs';
import type { MD3Elevation } from '../../types/theme';
import { TouchableRipple, type TouchableRippleProps } from '../TouchableRipple';
import { CardVariant } from './types';
import { resolveStateVariant } from '../../utils';
import { Surface } from '../Surface';
import { cardStyles } from './utils';

export type Props = TouchableRippleProps &
    CallbackActionState & {
        variant?: CardVariant;
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
    const state = resolveStateVariant({
        disabled: !!disabled,
        pressed: !!pressed,
        hovered: !!hovered,
    });

    cardStyles.useVariants({
        variant,
        state,
    });

    const styles = useMemo(() => {
        const { elevationLevel, ...restStles } = StyleSheet.flatten([
            // @ts-ignore
            cardStyles.root,
            style,
        ]);

        return {
            container: [cardStyles.container, restStles],
            innerContainer: [cardStyles.innerContainer, touchableContainerStyle],
            elevationLevel,
        };
    }, [style, touchableContainerStyle]);

    const elevation = useMemo(
        () => (elevationProp === undefined ? styles.elevationLevel ?? 0 : elevationProp),
        [elevationProp, styles.elevationLevel],
    );

    return (
        <Surface
            style={styles.container}
            elevation={
                !(disableOnHoverElevation && hovered)
                    ? (elevationProp || 0) + styles.elevationLevel
                    : elevation
            }>
            <TouchableRipple style={styles.innerContainer} {...rest} disabled={disabled} ref={ref}>
                <>{children}</>
            </TouchableRipple>
        </Surface>
    );
};

export default memo(withActionState(forwardRef(Card)));
