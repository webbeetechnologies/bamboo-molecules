import { TextStyle, ViewStyle, StyleSheet } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type States = 'hovered' | 'selectedAndHovered' | 'selected' | 'disabled';
type CustomProps = {
    container?: ViewStyle;
    touchableRippleContainer?: ViewStyle;
    label?: TextStyle;
    leftElement?: ViewStyle;
    rightElement?: ViewStyle;
    iconSize?: number;
};

export type SizeProps = {
    iconSize?: number;
    label?: TextStyle;
    container?: ViewStyle;
};

export const chipStyles: ComponentStylePropWithVariants<ViewStyle, States, CustomProps, SizeProps> =
    {
        container: {
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
            color: 'colors.onSurfaceVariant',
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

        sizes: {
            sm: {
                iconSize: 15,

                container: {
                    minHeight: 28,
                },
                label: {
                    paddingHorizontal: 'spacings.1',
                    fontSize: 'typescale.labelMedium.fontSize' as unknown as number,
                    fontWeight:
                        'typescale.labelMedium.fontWeight' as unknown as TextStyle['fontWeight'],
                    lineHeight: 'typescale.labelMedium.lineHeight' as unknown as number,
                },
            },
            md: {
                iconSize: 18,

                container: {
                    minHeight: 32,
                },
                label: {
                    paddingHorizontal: 'spacings.2',
                    fontSize: 'typescale.labelLarge.fontSize' as unknown as number,
                    fontWeight:
                        'typescale.labelLarge.fontWeight' as unknown as TextStyle['fontWeight'],
                    lineHeight: 'typescale.labelLarge.lineHeight' as unknown as number,
                },
            },
        },
    };
