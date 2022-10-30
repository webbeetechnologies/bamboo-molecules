import type { ComponentStylePropWithVariants } from '../../types';
import { StyleSheet, ViewStyle } from 'react-native';

type States =
    | 'disabled'
    | 'focused'
    | 'hovered'
    | 'error'
    | 'errorFocused'
    | 'errorHovered'
    | 'errorDisabled';

type CustomProps = {
    activeColor?: string;
    animationScale?: string;
    floatingLabelHorizontalOffset?: number | string;
    minimizedLabelFontSize?: number;
    maximizedLabelFontSize?: number;
    labelWiggleXOffset?: number;

    container?: Record<string, string | number>;
    labelText?: Record<string, string | number>;
    leadingIcon?: Record<string, string | number>;
    trailingIcon?: Record<string, string | number>;
    activeIndicator?: Record<string, string | number>;
    inputText?: Record<string, string | number>;
    supportingText?: Record<string, string | number>;
    placeholder?: Record<string, string | number>;
    outline?: Record<string, string | number>;
};

type CustomSizeProps = {
    inputText?: Record<string, string | number>;
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
    floatingLabelHorizontalOffset: 16,
    minimizedLabelFontSize: 12,
    maximizedLabelFontSize: 16,
    labelWiggleXOffset: 4,

    container: {
        flexDirection: 'row',
        paddingHorizontal: 'spacings.4',
    },
    leadingIcon: {
        color: 'colors.onSurfaceVariant',
        iconSize: 20,
        marginRight: 'spacings.3',
        marginLeft: 'spacings._1',
        justifyContent: 'center',
    },
    trailingIcon: {
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
    supportingText: {
        color: 'colors.onSurfaceVariant',
        fontSize: 'typescale.bodySmall.fontSize',
        lineHeight: 'typescale.bodySmall.lineHeight',
        fontWeight: 'typescale.bodySmall.fontWeight',
        marginTop: 'spacings.1',
        marginHorizontal: 'spacings.4',
    },
    placeholder: {
        color: 'colors.onSurfaceVariant',
    },
    outline: {},
    activeIndicator: {},

    variants: {
        outlined: {
            backgroundColor: 'colors.surface', // floating label backgroundColor comes from here because we want it to be the same background as the TextInput
            floatingLabelHorizontalOffset: 0,

            outline: {
                borderRadius: 'roundness.1',
                borderColor: 'colors.outline',
                borderWidth: 1,
            },
            labelText: {
                paddingHorizontal: 'spacings.1',
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
                    inputMinHeight: 56,

                    inputText: {
                        paddingTop: 'spacings.3',
                        paddingBottom: 2,
                    },
                },
                md: {
                    inputMinHeight: 56,

                    inputText: {
                        paddingTop: 2,
                        paddingBottom: 2,
                    },
                },
                dense: {
                    inputMinHeight: 48,
                },
                labeledDense: {
                    inputMinHeight: 48,
                },
            },
        },
        flat: {
            container: {
                backgroundColor: 'colors.surfaceVariant',
                borderTopLeftRadius: 'roundness.1',
                borderTopRightRadius: 'roundness.1',
            },

            leadingIcon: {},
            trailingIcon: {},
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
                    inputMinHeight: 56,

                    inputText: {
                        paddingTop: 'spacings.8',
                        paddingBottom: 2,
                    },
                },
                md: {
                    inputMinHeight: 56,

                    inputText: {
                        paddingTop: 'spacings.4',
                        paddingBottom: 2,
                    },
                },
                dense: {
                    inputMinHeight: 40,
                },
                labeledDense: {
                    inputMinHeight: 52,

                    inputText: {
                        paddingTop: 'spacings.5',
                        paddingBottom: 2,
                    },
                },
            },
        },
    },

    states: {
        focused: {
            activeColor: 'colors.primary',

            labelText: {
                color: 'colors.primary',
            },
        },

        hovered: {},

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
                color: 'colors.onSurface',
                opacity: 0.38,
            },
            leadingIcon: {
                color: 'colors.onSurface',
                opacity: 0.38,
            },
            trailingIcon: {
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
            supportingText: {
                color: 'colors.error',
            },
            leadingIcon: {
                color: 'colors.onSurfaceVariant',
            },
            trailingIcon: {
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
            supportingText: {
                color: 'colors.error',
            },
            leadingIcon: {
                color: 'colors.onSurfaceVariant',
            },
            trailingIcon: {
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
                color: 'colors.error',
                opacity: 0.38,
            },
            leadingIcon: {
                color: 'colors.onSurfaceVariant',
                opacity: 0.38,
            },
            trailingIcon: {
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
            supportingText: {
                color: 'colors.error',
            },
            leadingIcon: {
                color: 'colors.onSurfaceVariant',
            },
            trailingIcon: {
                color: 'colors.onErrorContainer',
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
    },
});
