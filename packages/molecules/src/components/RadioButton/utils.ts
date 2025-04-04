import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { StyleSheet } from 'react-native-unistyles';

// type States = 'disabled' | 'checked' | 'hovered' | 'checkedAndHovered';

const radioButtonStylesDefault = StyleSheet.create(theme => ({
    root: {
        color: theme.colors.onSurfaceVariant,
        uncheckedColor: theme.colors.onSurfaceVariant,
        animationScale: theme.animation.scale,
        animationDuration: `${theme.animation.durations['1']}`,
        iconSize: 24,

        variants: {
            state: {
                checked: {
                    color: theme.colors.primary,
                },
                disabled: {
                    color: theme.colors.onSurfaceDisabled,
                    uncheckedColor: theme.colors.onSurfaceDisabled,
                },
            },
        },
    },

    container: {
        borderRadius: theme.shapes.corner.full as unknown as number,
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
    stateLayer: {
        variants: {
            state: {
                hovered: {
                    backgroundColor: theme.colors.stateLayer.hover.onSurface,
                },

                checkedAndHovered: {
                    backgroundColor: theme.colors.stateLayer.hover.primary,
                },
            },
        },
    },
}));

const radioButtonItemStylesDefault = StyleSheet.create(theme => ({
    root: {
        paddingVertical: theme.spacings['2'],
        paddingHorizontal: theme.spacings['4'],

        variants: {
            state: {
                checked: {},
                disabled: {},
            },
        },
    },
    label: {
        color: theme.colors.onSurface,

        variants: {
            state: {
                checked: {},
                disabled: {
                    color: theme.colors.onSurfaceDisabled,
                },
            },
        },
    },
}));

registerComponentsStyles({
    radioButtonStyles: radioButtonStylesDefault,
    radioButtonItemStyles: radioButtonItemStylesDefault,
});

export const radioButtonStyles = getRegisteredMoleculesComponentStyles('radioButtonStyles');
export const radioButtonItemStyles = getRegisteredMoleculesComponentStyles('radioButtonItemStyles');

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
