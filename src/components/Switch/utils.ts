import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type CustomStyleProp = {
    container?: ViewStyle;
    button?: ViewStyle;
    toggle?: ViewStyle;
    toggleWheel?: ViewStyle;
    icon?: TextStyle;
};

export const switchStyles: ComponentStylePropWithVariants<
    ViewStyle,
    | 'selected'
    | 'selected_disabled'
    | 'selected_pressed'
    | 'disabled'
    | 'hovered'
    | 'focused'
    | 'pressed'
    | 'selected_hovered',
    CustomStyleProp
> = {
    container: {},
    button: { flexDirection: 'row', alignItems: 'center' },

    toggle: {
        justifyContent: 'center',
        backgroundColor: 'colors.surfaceContainerHighest',
        borderColor: 'colors.outline',
    },

    toggleWheel: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'colors.outline',
        elevation: 1.5,
    },

    icon: {
        color: 'colors.surfaceContainerHighest',
    },

    states: {
        selected: {
            toggle: {
                borderWidth: 0,
                backgroundColor: 'colors.primary',
            },
            toggleWheel: {
                backgroundColor: 'colors.onPrimary',
            },
            icon: {
                color: 'colors.onPrimaryContainer',
            },
        },
        selected_hovered: {
            toggle: {
                borderWidth: 0,
                backgroundColor: 'colors.primary',
            },
            toggleWheel: {
                backgroundColor: 'colors.primaryContainer',
            },
            icon: {
                color: 'colors.onPrimaryContainer',
            },
        },
        disabled: {
            toggle: {
                opacity: 0.12,
                backgroundColor: 'colors.surfaceContainerHighest',
                borderColor: 'colors.onSurface',
            },
            toggleWheel: {
                opacity: 0.38,
            },
            icon: {
                color: 'colors.surfaceContainerHighest',
                opacity: 0.38,
            },
        },
        selected_disabled: {
            toggle: {
                opacity: 0.12,
                backgroundColor: 'colors.onSurface',
            },
            toggleWheel: {
                opacity: 1,
            },
            icon: {
                color: 'colors.onSurface',
                opacity: 0.38,
            },
        },
        selected_pressed: {
            toggle: {
                borderWidth: 0,
                backgroundColor: 'colors.primary',
            },
            toggleWheel: {
                backgroundColor: 'colors.primaryContainer',
            },
            icon: {
                color: 'colors.onPrimaryContainer',
            },
        },
        pressed: {
            toggleWheel: {
                backgroundColor: 'colors.onSurfaceVariant',
            },
        },
        hovered: {
            toggleWheel: {
                backgroundColor: 'colors.onSurfaceVariant',
            },
        },
        focused: {
            toggleWheel: {
                backgroundColor: 'colors.onSurfaceVariant',
            },
        },
    },
};
