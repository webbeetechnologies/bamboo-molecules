import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type CustomStyleProp = {
    switchContainer?: ViewStyle;
    thumbContainer?: ViewStyle;
    thumb?: ViewStyle;
    icon?: TextStyle;
    overlay?: ViewStyle;
    checkedColor?: string;
    uncheckedColor?: string;
    thumbColor?: string;
};

type States =
    | 'selected'
    | 'selected_disabled'
    | 'selected_pressed'
    | 'disabled'
    | 'hovered'
    | 'focused'
    | 'pressed'
    | 'hovered_pressed'
    | 'selected_hovered'
    | 'selected_focused'
    | 'selected_hovered_pressed'
    | 'selected_focused_pressed';

export const switchStyles: ComponentStylePropWithVariants<ViewStyle, States, CustomStyleProp> = {
    uncheckedColor: 'colors.surfaceContainerHighest',
    checkedColor: 'colors.primary',
    thumbColor: 'colors.outline',

    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'colors.surfaceContainerHighest',
        borderColor: 'colors.outline',
    },

    thumbContainer: { flexDirection: 'row', alignItems: 'center' },

    overlay: {
        display: 'none',
        position: 'absolute',
        right: 0,
    },

    thumb: {
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1.5,
    },

    icon: {
        color: 'colors.surfaceContainerHighest',
    },

    states: {
        selected: {
            thumbColor: 'colors.onPrimary',
            checkedColor: 'colors.primary',
            switchContainer: {
                borderWidth: 0,
            },
            icon: {
                color: 'colors.onPrimaryContainer',
            },
        },
        selected_hovered: {
            thumbColor: 'colors.primaryContainer',
            checkedColor: 'colors.primary',
            switchContainer: {
                borderWidth: 0,
            },
            icon: {
                color: 'colors.onPrimaryContainer',
            },
            overlay: {
                backgroundColor: 'colors.stateLayer.hover.primary',
                display: 'flex',
            },
        },
        selected_focused: {
            thumbColor: 'colors.primaryContainer',
            checkedColor: 'colors.primary',
            switchContainer: {
                borderWidth: 0,
            },
            icon: {
                color: 'colors.onPrimaryContainer',
            },
            overlay: {
                backgroundColor: 'colors.stateLayer.focussed.primary',
                display: 'flex',
            },
        },
        disabled: {
            uncheckedColor: 'colors.surfaceContainerHighest',
            switchContainer: {
                opacity: 0.12,
                borderColor: 'colors.onSurface',
            },
            thumb: {
                opacity: 0.38,
            },
            icon: {
                color: 'colors.surfaceContainerHighest',
                opacity: 0.38,
            },
        },
        selected_disabled: {
            checkedColor: 'colors.onSurface',
            switchContainer: {
                opacity: 0.12,
            },
            thumb: {
                opacity: 1,
            },
            icon: {
                color: 'colors.onSurface',
                opacity: 0.38,
            },
        },
        selected_pressed: {
            thumbColor: 'colors.primaryContainer',
            checkedColor: 'colors.primary',
            switchContainer: {
                borderWidth: 0,
            },
            overlay: {
                backgroundColor: 'colors.stateLayer.pressed.primary',
                display: 'flex',
            },
            icon: {
                color: 'colors.onPrimaryContainer',
            },
        },
        selected_hovered_pressed: {
            thumbColor: 'colors.primaryContainer',
            checkedColor: 'colors.primary',
            switchContainer: {
                borderWidth: 0,
            },
            overlay: {
                backgroundColor: 'colors.stateLayer.pressed.primary',
                display: 'flex',
            },
            icon: {
                color: 'colors.onPrimaryContainer',
            },
        },
        selected_focused_pressed: {
            thumbColor: 'colors.primaryContainer',
            checkedColor: 'colors.primary',
            switchContainer: {
                borderWidth: 0,
            },
            overlay: {
                backgroundColor: 'colors.stateLayer.pressed.primary',
                display: 'flex',
            },
            icon: {
                color: 'colors.onPrimaryContainer',
            },
        },
        hovered_pressed: {
            thumbColor: 'colors.onSurfaceVariant',
            overlay: {
                backgroundColor: 'colors.stateLayer.pressed.onSurface',
                display: 'flex',
            },
        },
        pressed: {
            thumbColor: 'colors.onSurfaceVariant',
            overlay: {
                backgroundColor: 'colors.stateLayer.pressed.onSurface',
                display: 'flex',
            },
        },
        hovered: {
            thumbColor: 'colors.onSurfaceVariant',
            overlay: {
                backgroundColor: 'colors.stateLayer.hover.onSurface',
                display: 'flex',
            },
        },
        focused: {
            thumbColor: 'colors.onSurfaceVariant',
            overlay: {
                backgroundColor: 'colors.stateLayer.focussed.onSurface',
                display: 'flex',
            },
        },
    },
};
