import { TextStyle, ViewStyle, StyleSheet } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type States = 'hovered' | 'selectedAndHovered' | 'selected' | 'disabled';
type CustomProps = {
    container?: ViewStyle;
    touchableRippleContainer?: ViewStyle;
    label?: TextStyle;
    leftElement?: ViewStyle;
    rightElement?: ViewStyle;
};

export const chipStyles: ComponentStylePropWithVariants<ViewStyle, States, CustomProps> = {
    container: {
        minHeight: 32,
        borderRadius: 'shapes.corner.small' as unknown as number,
    },
    touchableRippleContainer: {
        flex: 1,
        paddingHorizontal: 'spacings.2',
        borderRadius: 'shapes.corner.small' as unknown as number,
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        display: 'flex',
        marginHorizontal: 'spacings.2',
        color: 'colors.onSurfaceVariant',
        fontSize: 'typescale.labelLarge.fontSize' as unknown as number,
        fontWeight: 'typescale.labelLarge.fontWeight' as unknown as TextStyle['fontWeight'],
        lineHeight: 'typescale.labelLarge.lineHeight' as unknown as number,
    },
    leftElement: {},
    rightElement: {},

    variants: {
        outlined: {
            container: {
                borderWidth: StyleSheet.hairlineWidth,
                borderStyle: 'solid',
                borderColor: 'colors.outline',
            },

            states: {
                disabled: {
                    borderColor: 'colors.onSurface',
                    opacity: 0.38,
                },
            },
        },
        elevated: {
            container: {
                backgroundColor: 'colors.surface',
            },
        },
    },

    states: {
        selected: {
            container: {
                backgroundColor: 'colors.secondaryContainer',
                borderWidth: 0,
            },
        },
        disabled: {
            container: {
                backgroundColor: 'colors.stateLayer.disabled.onSurface',
                borderWidth: 0,
            },
        },
        hovered: {
            container: {
                backgroundColor: 'colors.stateLayer.hovered.onSurfaceVariant',
            },
        },
        selectedAndHovered: {
            backgroundColor: 'colors.stateLayer.hovered.onSecondaryContainer',
        },
    },
};
