import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type States = 'disabled' | 'checked' | 'hovered' | 'checkedAndHovered';

type CustomProps = {
    uncheckedColor?: string;
    animationScale?: string;
    animationDuration?: string;
    labelColor?: string;
    iconSize?: number | string;

    container?: ViewStyle;
    radioContainer?: ViewStyle;
    radio?: ViewStyle;
    dot?: ViewStyle;
    stateLayer?: ViewStyle;
};

export const radioButtonStyles: ComponentStylePropWithVariants<TextStyle, States, CustomProps> = {
    color: 'colors.onSurfaceVariant',
    uncheckedColor: 'colors.onSurfaceVariant',
    animationScale: 'animation.scale',
    animationDuration: 'animation.durations.1',
    iconSize: 24,

    container: {
        borderRadius: 'shapes.corner.full' as unknown as number,
    },
    radioContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    radio: {
        height: 20,
        width: 20,
        borderRadius: 10,
        margin: 8,
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
    },

    states: {
        checked: {
            color: 'colors.primary',
        },
        disabled: {
            color: 'colors.onSurfaceDisabled',
            uncheckedColor: 'colors.onSurfaceDisabled',
            labelColor: 'colors.onSurfaceDisabled',
        },

        hovered: {
            stateLayer: {
                backgroundColor: 'colors.stateLayer.hover.onSurface',
            },
        },

        checkedAndHovered: {
            stateLayer: {
                backgroundColor: 'colors.stateLayer.hover.primary',
            },
        },
    },
};

export const radioButtonItemStyles: ComponentStylePropWithVariants<TextStyle, States, CustomProps> =
    {
        paddingVertical: 'spacings.2',
        paddingHorizontal: 'spacings.4',
    };

export const handlePress = ({
    onPress,
    value,
    onValueChange,
}: {
    onPress?: () => void;
    value: string;
    onValueChange?: (value: string) => void;
}) => {
    if (onPress && onValueChange) {
        console.warn(
            `onPress in the scope of RadioButtonGroup will not be executed, use onValueChange instead`,
        );
    }

    onValueChange ? onValueChange(value) : onPress?.();
};

export const isChecked = ({
    value,
    status,
    contextValue,
}: {
    value: string;
    status?: 'checked' | 'unchecked';
    contextValue?: string;
}) => {
    if (contextValue !== undefined && contextValue !== null) {
        return contextValue === value ? 'checked' : 'unchecked';
    } else {
        return status;
    }
};
