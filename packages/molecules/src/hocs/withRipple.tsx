import type { ComponentType } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { TouchableRipple, type TouchableRippleProps } from '../components/TouchableRipple';

export type WithRippleProps = Omit<TouchableRippleProps, 'children'> & {
    rippleContainerStyles?: StyleProp<ViewStyle>;
};

const withRipple =
    <T,>(Component: ComponentType<T>) =>
    ({
        background,
        borderless,
        centered,
        disabled,
        onPress,
        onLongPress,
        rippleColor,
        underlayColor,
        rippleContainerStyles,
        ...rest
    }: WithRippleProps & T) => {
        return (
            <TouchableRipple
                background={background}
                borderless={borderless}
                centered={centered}
                disabled={disabled}
                onPress={onPress}
                onLongPress={onLongPress}
                rippleColor={rippleColor}
                underlayColor={underlayColor}
                style={rippleContainerStyles}>
                {/* @ts-ignore */}
                <Component {...rest} />
            </TouchableRipple>
        );
    };

export default withRipple;
