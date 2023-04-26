import type { ComponentStylePropWithVariants } from '../../types';
import { StyleSheet, ViewStyle } from 'react-native';

type States =
    | 'disabled'
    | 'focused'
    | 'hovered'
    | 'hoveredAndFocused'
    | 'errorFocusedAndHovered'
    | 'error'
    | 'errorFocused'
    | 'errorHovered'
    | 'errorDisabled';

type CustomProps = {
    activeColor?: string;
    animationScale?: string;
    floatingLabelVerticalOffset?: number | string;
    minimizedLabelFontSize?: number;
    maximizedLabelFontSize?: number;
    labelWiggleXOffset?: number;

    container?: Record<string, string | number>;
    labelText?: Record<string, string | number>;
    leftElement?: Record<string, string | number>;
    rightElement?: Record<string, string | number>;
    activeIndicator?: Record<string, string | number>;
    inputText?: Record<string, string | number>;
    supportingText?: Record<string, string | number>;
    placeholder?: Record<string, string | number>;
    outline?: Record<string, string | number>;
    defaultLabelBackground?: string;
    stateLayer?: ViewStyle;
};

type CustomSizeProps = {
    inputText?: Record<string, string | number>;
    labelText?: Record<string, string | number>;
    inputMinHeight?: number;
};

export type TextInputStyles = ComponentStylePropWithVariants<
    ViewStyle,
    States,
    CustomProps,
    CustomSizeProps
>;

export const defaultStyles: TextInputStyles = {
    animationScale: 'animation.scale',
    floatingLabelVerticalOffset: 16,
    minimizedLabelFontSize: 12,
    maximizedLabelFontSize: 16,
    labelWiggleXOffset: 4,

    container: {
        flexDirection: 'row',
        paddingHorizontal: 'spacings.4',
    },
    leftElement: {
        color: 'colors.onSurfaceVariant',
        iconSize: 20,
        marginRight: 'spacings.3',
        marginLeft: 'spacings._1',
        justifyContent: 'center',
    },
    rightElement: {
        color: 'colors.onSurfaceVariant',
        iconSize: 24,
        marginRight: 'spacings._1',
        marginLeft: 'spacings.3',
        justifyContent: 'center',
    },
    labelText: {
        position: 'absolute',
        left: 0,
        color: 'colors.onSurfaceVariant',
        fontSize: 'typescale.bodyLarge.fontSize',
        lineHeight: 'typescale.bodyLarge.lineHeight',
        fontWeight: 'typescale.bodyLarge.fontWeight',
    },
    inputText: {
        color: 'colors.onSurface',
        fontSize: 'typescale.bodyLarge.fontSize',
        lineHeight: 'typescale.bodyLarge.lineHeight',
        fontWeight: 'typescale.bodyLarge.fontWeight',
        flexGrow: 1,
    },
    supportingText: {},
    placeholder: {
        color: 'colors.onSurfaceVariant',
    },
    outline: {},
    activeIndicator: {},

    variants: {
        outlined: {
            defaultLabelBackground: 'colors.surface',
            //backgroundColor: 'inherit', // floating label backgroundColor comes from here because we want it to be the same background as the TextInput
            floatingLabelVerticalOffset: 0,

            container: {
                borderRadius: 'shapes.corner.extraSmall',
            },

            outline: {
                borderRadius: 'shapes.corner.extraSmall',
                borderColor: 'colors.outline',
                borderWidth: 1,
            },
            labelText: {
                paddingHorizontal: 'spacings.1',
                marginLeft: 'spacings._1', // to counter-act the padding
            },

            states: {
                focused: {
                    outline: {
                        borderWidth: 2,
                        borderColor: 'colors.primary',
                    },
                },

                disabled: {},

                errorDisabled: {
                    outline: {
                        borderColor: 'colors.error',
                        backgroundColor: 'colors.surface',
                    },
                },

                hovered: {
                    outline: {
                        borderColor: 'colors.onSurface',
                    },
                },

                errorHovered: {
                    outline: {
                        borderColor: 'colors.onErrorContainer',
                        backgroundColor: 'colors.surface',
                    },
                },

                hoveredAndFocused: {
                    outline: {
                        borderWidth: 2,
                        borderColor: 'colors.primary',
                    },
                },

                errorFocusedAndHovered: {
                    outline: {
                        borderWidth: 2,
                        borderColor: 'colors.error',
                        backgroundColor: 'colors.surface',
                    },
                },

                errorFocused: {
                    outline: {
                        borderWidth: 2,
                        borderColor: 'colors.error',
                        backgroundColor: 'colors.surface',
                    },
                },

                error: {
                    outline: {
                        borderColor: 'colors.error',
                        backgroundColor: 'colors.surface',
                    },
                },
            },

            sizes: {
                lg: {
                    inputMinHeight: 64,

                    inputText: {
                        paddingTop: 'spacings.3',
                        paddingBottom: 'spacings.3',
                    },
                },
                md: {
                    inputMinHeight: 56,

                    inputText: {
                        paddingTop: 'spacings.1',
                        paddingBottom: 'spacings.1',
                    },
                },
                sm: {
                    inputMinHeight: 48,
                },
            },
        },
        flat: {
            container: {
                backgroundColor: 'colors.surfaceVariant',
                borderTopLeftRadius: 'shapes.corner.extraSmall',
                borderTopRightRadius: 'shapes.corner.extraSmall',
            },

            leftElement: {},
            rightElement: {},
            activeIndicator: {
                height: 1,
                backgroundColor: 'colors.onSurfaceVariant',
            },

            labelText: {},
            inputText: {},
            supportingText: {},
            placeholder: {},

            states: {
                focused: {
                    activeIndicator: {
                        height: 2,
                        backgroundColor: 'colors.primary',
                    },
                },

                hovered: {
                    activeIndicator: {
                        height: 1,
                        backgroundColor: 'colors.onSurface',
                    },
                    stateLayer: {
                        backgroundColor: 'colors.stateLayer.hover.onSurface',
                    },
                },

                errorHovered: {
                    activeIndicator: {
                        height: 1,
                        backgroundColor: 'colors.onErrorContainer',
                    },
                    stateLayer: {
                        backgroundColor: 'colors.stateLayer.hover.onSurface',
                    },
                },

                hoveredAndFocused: {
                    activeIndicator: {
                        height: 2,
                        backgroundColor: 'colors.primary',
                    },
                },

                errorFocusedAndHovered: {
                    activeIndicator: {
                        height: 2,
                        backgroundColor: 'colors.error',
                    },
                },

                disabled: {
                    container: {
                        backgroundColor: 'colors.surfaceVariant',
                    },
                    activeIndicator: {
                        height: 1,
                        backgroundColor: 'colors.onSurface',
                        opacity: 0.38,
                    },
                },

                error: {
                    activeIndicator: {
                        backgroundColor: 'colors.error',
                    },
                },

                errorFocused: {
                    activeIndicator: {
                        height: 2,
                        backgroundColor: 'colors.error',
                    },
                },

                errorDisabled: {
                    activeIndicator: {
                        height: 1,
                        backgroundColor: 'colors.error',
                        opacity: 0.38,
                    },
                },
            },

            sizes: {
                lg: {
                    inputMinHeight: 64,

                    inputText: {
                        paddingTop: 'spacings.6',
                        paddingBottom: 2,
                    },
                },
                md: {
                    inputMinHeight: 56,

                    inputText: {
                        paddingTop: 'spacings.6',
                        paddingBottom: 'spacings.2',
                    },
                },
                sm: {
                    inputMinHeight: 52,

                    inputText: {
                        paddingTop: 'spacings.5',
                        paddingBottom: 'spacings.2',
                    },
                },
            },
        },
        plain: {},
    },

    states: {
        focused: {
            activeColor: 'colors.primary',

            labelText: {
                color: 'colors.primary',
            },
        },

        hovered: {},

        hoveredAndFocused: {
            activeColor: 'colors.primary',

            labelText: {
                color: 'colors.primary',
            },
        },

        disabled: {
            labelText: {
                color: 'colors.onSurface',
                opacity: 0.38,
            },
            inputText: {
                color: 'colors.onSurface',
                opacity: 0.38,
            },
            supportingText: {
                opacity: 0.38,
            },
            leftElement: {
                color: 'colors.onSurface',
                opacity: 0.38,
            },
            rightElement: {
                color: 'colors.onSurface',
                opacity: 0.38,
            },
        },

        error: {
            activeColor: 'colors.error',

            labelText: {
                color: 'colors.error',
            },
            inputText: {
                color: 'colors.onSurface',
            },
            leftElement: {
                color: 'colors.onSurfaceVariant',
            },
            rightElement: {
                color: 'colors.error',
            },
        },

        errorFocused: {
            activeColor: 'colors.error',

            labelText: {
                color: 'colors.error',
            },
            inputText: {
                color: 'colors.onSurface',
            },
            leftElement: {
                color: 'colors.onSurfaceVariant',
            },
            rightElement: {
                color: 'colors.error',
            },
        },

        errorFocusedAndHovered: {
            activeColor: 'colors.error',

            labelText: {
                color: 'colors.error',
            },
            inputText: {
                color: 'colors.onSurface',
            },
            leftElement: {
                color: 'colors.onSurfaceVariant',
            },
            rightElement: {
                color: 'colors.error',
            },
        },

        errorDisabled: {
            activeColor: 'colors.error',

            labelText: {
                color: 'colors.error',
                opacity: 0.38,
            },
            inputText: {
                color: 'colors.onSurface',
                opacity: 0.38,
            },
            supportingText: {
                opacity: 0.38,
            },
            leftElement: {
                color: 'colors.onSurfaceVariant',
                opacity: 0.38,
            },
            rightElement: {
                color: 'colors.error',
                opacity: 0.38,
            },
        },

        errorHovered: {
            activeIndicator: {
                backgroundColor: 'colors.onErrorContainer',
            },
            labelText: {
                color: 'colors.onErrorContainer',
            },
            inputText: {
                color: 'colors.onSurface',
            },
            leftElement: {
                color: 'colors.onSurfaceVariant',
            },
            rightElement: {
                color: 'colors.onErrorContainer',
            },
        },
    },

    sizes: {
        lg: {
            labelText: {
                fontSize: 'typescale.bodyExtraLarge.fontSize',
                lineHeight: 'typescale.bodyExtraLarge.lineHeight',
                fontWeight: 'typescale.bodyExtraLarge.fontWeight',
            },
            inputText: {
                fontSize: 'typescale.bodyExtraLarge.fontSize',
                lineHeight: 'typescale.bodyExtraLarge.lineHeight',
                fontWeight: 'typescale.bodyExtraLarge.fontWeight',
            },
        },
        md: {
            labelText: {
                fontSize: 'typescale.bodyLarge.fontSize',
                lineHeight: 'typescale.bodyLarge.lineHeight',
                fontWeight: 'typescale.bodyLarge.fontWeight',
            },
            inputText: {
                fontSize: 'typescale.bodyLarge.fontSize',
                lineHeight: 'typescale.bodyLarge.lineHeight',
                fontWeight: 'typescale.bodyLarge.fontWeight',
            },
        },
        sm: {
            labelText: {
                fontSize: 'typescale.bodyMedium.fontSize',
                lineHeight: 'typescale.bodyMedium.lineHeight',
                fontWeight: 'typescale.bodyMedium.fontWeight',
            },
            inputText: {
                fontSize: 'typescale.bodyMedium.fontSize',
                lineHeight: 'typescale.bodyMedium.lineHeight',
                fontWeight: 'typescale.bodyMedium.fontWeight',
            },
        },
    },
};

export const styles = StyleSheet.create({
    underline: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 1,
        zIndex: 1,
    },
    outline: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    labelContainer: {
        paddingTop: 0,
        paddingBottom: 0,
        flexGrow: 1,
        flexShrink: 1,
    },
    patchContainer: {
        height: 24,
        zIndex: 2,
    },
});
