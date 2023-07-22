import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type CustomStyleProp = {
    container?: ViewStyle;
    button?: ViewStyle;
    toggle?: ViewStyle;
    toggleWheel?: ViewStyle;
    icon?: TextStyle;
};

export const newSwitchStyles: ComponentStylePropWithVariants<
    ViewStyle,
    'selected_disabled' | 'active' | 'disabled' | 'offIcon',
    CustomStyleProp
> = {
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        borderRadius: 16,
    },

    toggle: {
        width: 52,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        borderWidth: 2,
        backgroundColor: 'colors.surface',
        borderColor: 'colors.outline',
    },

    toggleWheel: {
        width: 16,
        height: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        elevation: 1.5,
    },

    icon: {
        color: 'colors.surfaceVariant',
    },

    states: {
        active: {
            toggle: {
                borderWidth: 0,
                backgroundColor: 'colors.primary',
            },
            toggleWheel: {
                width: 24,
                height: 24,
                borderRadius: 12,
            },
            icon: {
                color: 'colors.onPrimaryContainer',
            },
        },
        offIcon: {
            toggleWheel: {
                width: 24,
                height: 24,
                borderRadius: 12,
            },
        },
        disabled: {
            toggle: {
                opacity: 0.12,
                backgroundColor: 'colors.surfaceVariant',
                borderColor: 'colors.onSurface',
            },
            toggleWheel: {
                width: 16,
                height: 16,
                borderRadius: 8,
                opacity: 0.38,
            },
            icon: {
                color: 'colors.onSurfaceVariant',
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
                width: 24,
                height: 24,
                borderRadius: 12,
            },
            icon: {
                color: 'colors.onSurface',
                opacity: 0.38,
            },
        },
    },
};
