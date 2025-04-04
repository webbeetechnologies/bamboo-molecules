import { StyleSheet } from 'react-native-unistyles';

export type States =
    | 'disabled'
    | 'focused'
    | 'hovered'
    | 'hoveredAndFocused'
    | 'errorFocusedAndHovered'
    | 'error'
    | 'errorFocused'
    | 'errorHovered'
    | 'errorDisabled';

export const styles = StyleSheet.create(theme => ({
    root: {
        variants: {
            variant: {
                outlined: {
                    ...({
                        defaultLabelBackground: theme.colors.surface,
                    } as Record<string, any>),
                },
            },
            state: {
                focused: {
                    ...({
                        activeColor: theme.colors.primary,
                    } as Record<string, any>),
                },
                hovered: {},
                hoveredAndFocused: {
                    ...({
                        activeColor: theme.colors.primary,
                    } as Record<string, any>),
                },
                disabled: {},
                error: {
                    ...({
                        activeColor: theme.colors.error,
                    } as Record<string, any>),
                },
                errorFocused: {
                    ...({
                        activeColor: theme.colors.error,
                    } as Record<string, any>),
                },
                errorFocusedAndHovered: {
                    ...({
                        activeColor: theme.colors.error,
                    } as Record<string, any>),
                },
                errorDisabled: {
                    ...({
                        activeColor: theme.colors.error,
                    } as Record<string, any>),
                },
                errorHovered: {},
            },
            size: {
                lg: {},
                md: {},
                sm: {},
            },
        },
        compoundVariants: [
            {
                variant: 'outlined',
                size: 'lg',
                styles: {
                    ...({
                        inputMinHeight: 64,
                    } as Record<string, any>),
                },
            },
            {
                variant: 'outlined',
                size: 'md',
                styles: {
                    ...({
                        inputMinHeight: 56,
                    } as Record<string, any>),
                },
            },
            {
                variant: 'outlined',
                size: 'sm',
                styles: {
                    ...({
                        inputMinHeight: 48,
                    } as Record<string, any>),
                },
            },
            {
                variant: 'flat',
                size: 'lg',
                styles: {
                    ...({
                        inputMinHeight: 64,
                    } as Record<string, any>),
                },
            },
            {
                variant: 'flat',
                size: 'md',
                styles: {
                    ...({
                        inputMinHeight: 56,
                    } as Record<string, any>),
                },
            },
            {
                variant: 'flat',
                size: 'sm',
                styles: {
                    ...({
                        inputMinHeight: 52,
                    } as Record<string, any>),
                },
            },
        ],
    },

    container: {
        flexDirection: 'row',
        paddingHorizontal: theme.spacings['4'],
        variants: {
            variant: {
                outlined: {
                    borderRadius: theme.shapes.corner.extraSmall,
                },
                flat: {
                    backgroundColor: theme.colors.surfaceVariant,
                    borderTopLeftRadius: theme.shapes.corner.extraSmall,
                    borderTopRightRadius: theme.shapes.corner.extraSmall,
                },
                plain: {},
            },
        },
        compoundVariants: [
            {
                variant: 'flat',
                state: 'disabled',
                styles: {
                    backgroundColor: theme.colors.surfaceVariant,
                },
            },
        ],
    },
    leftElement: {
        color: theme.colors.onSurfaceVariant,
        iconSize: 20,
        marginRight: theme.spacings['3'],
        marginLeft: theme.spacings._1,
        justifyContent: 'center',

        state: {
            disabled: {
                color: theme.colors.onSurface,
                opacity: 0.38,
            },
            error: {
                color: theme.colors.onSurfaceVariant,
            },
            errorFocused: {
                color: theme.colors.onSurfaceVariant,
            },
            errorFocusedAndHovered: {
                color: theme.colors.onSurfaceVariant,
            },
            errorDisabled: {
                color: theme.colors.onSurfaceVariant,
                opacity: 0.38,
            },
            errorHovered: {
                color: theme.colors.onSurfaceVariant,
            },
        },
    },
    rightElement: {
        color: theme.colors.onSurfaceVariant,
        iconSize: 24,
        marginRight: theme.spacings._1,
        marginLeft: theme.spacings['3'],
        justifyContent: 'center',

        variants: {
            state: {
                disabled: {
                    color: theme.colors.onSurface,
                    opacity: 0.38,
                },
                error: {
                    color: theme.colors.error,
                },
                errorFocused: {
                    color: theme.colors.error,
                },
                errorFocusedAndHovered: {
                    color: theme.colors.error,
                },
                errorDisabled: {
                    color: theme.colors.error,
                    opacity: 0.38,
                },
                errorHovered: {
                    color: theme.colors.onErrorContainer,
                },
            },
        },
    },
    labelText: {
        position: 'absolute',
        left: 0,
        color: theme.colors.onSurfaceVariant,
        typescale: theme.typescale.bodyLarge,

        variants: {
            size: {
                lg: {
                    ...theme.typescale.bodyExtraLarge,
                },
                md: {
                    ...theme.typescale.bodyLarge,
                },
                sm: {
                    ...theme.typescale.bodyMedium,
                },
            },

            variant: {
                outlined: {
                    paddingHorizontal: theme.spacings['1'],
                    marginLeft: theme.spacings._1,
                },
            },

            state: {
                focused: {
                    color: theme.colors.primary,
                },

                hoveredAndFocused: {
                    color: theme.colors.primary,
                },

                disabled: {
                    color: theme.colors.onSurface,
                    opacity: 0.38,
                },

                error: {
                    color: theme.colors.error,
                },

                errorFocused: {
                    color: theme.colors.error,
                },

                errorFocusedAndHovered: {
                    color: theme.colors.error,
                },

                errorDisabled: {
                    color: theme.colors.error,
                    opacity: 0.38,
                },

                errorHovered: {
                    color: theme.colors.onErrorContainer,
                },
            },
        },
    },
    inputText: {
        color: theme.colors.onSurface,
        typescale: theme.typescale.bodyLarge,
        flexGrow: 1,

        variants: {
            size: {
                lg: {
                    ...theme.typescale.bodyExtraLarge,
                },
                md: {
                    ...theme.typescale.bodyLarge,
                },
                sm: {
                    ...theme.typescale.bodyMedium,
                },
            },

            state: {
                disabled: {
                    color: theme.colors.onSurface,
                    opacity: 0.38,
                },
                error: {
                    color: theme.colors.onSurface,
                },
                errorFocused: {
                    color: theme.colors.onSurface,
                },
                errorFocusedAndHovered: {
                    color: theme.colors.onSurface,
                },
                errorDisabled: {
                    color: theme.colors.onSurface,
                    opacity: 0.38,
                },
                errorHovered: {
                    color: theme.colors.onSurface,
                },
            },
        },
    },
    supportingText: {
        variants: {
            state: {
                disabled: {
                    opacity: 0.38,
                },
                errorDisabled: {
                    opacity: 0.38,
                },
            },
        },
    },
    placeholder: {
        color: theme.colors.onSurfaceVariant,
    },
    outline: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        variants: {
            variant: {
                outlined: {
                    borderRadius: theme.shapes.corner.extraSmall,
                    borderColor: theme.colors.outline,
                    borderWidth: 1,
                },
            },
        },
        compoundVariants: [
            {
                variant: 'outlined',
                state: 'focused',
                styles: {
                    borderWidth: 2,
                    borderColor: theme.colors.primary,
                },
            },
            {
                variant: 'outlined',
                state: 'errorDisabled',
                styles: {
                    borderColor: theme.colors.error,
                    backgroundColor: theme.colors.surface,
                },
            },
            {
                variant: 'outlined',
                state: 'hovered',
                styles: {
                    borderColor: theme.colors.onSurface,
                },
            },
            {
                variant: 'outlined',
                state: 'errorHovered',
                styles: {
                    borderColor: theme.colors.onErrorContainer,
                    backgroundColor: theme.colors.surface,
                },
            },
            {
                variant: 'outlined',
                state: 'hoveredAndFocused',
                styles: {
                    borderWidth: 2,
                    borderColor: theme.colors.primary,
                },
            },
            {
                variant: 'outlined',
                state: 'errorFocusedAndHovered',
                styles: {
                    borderWidth: 2,
                    borderColor: theme.colors.error,
                    backgroundColor: theme.colors.surface,
                },
            },
            {
                variant: 'outlined',
                state: 'errorFocused',
                styles: {
                    borderWidth: 2,
                    borderColor: theme.colors.error,
                    backgroundColor: theme.colors.surface,
                },
            },
            {
                variant: 'outlined',
                state: 'error',
                styles: {
                    borderColor: theme.colors.error,
                    backgroundColor: theme.colors.surface,
                },
            },
        ],
    },
    activeIndicator: {
        variants: {
            variant: {
                flat: {
                    height: 1,
                    backgroundColor: theme.colors.onSurfaceVariant,
                },
            },
            state: {
                errorHovered: {
                    backgroundColor: theme.colors.onErrorContainer,
                },
            },
        },
        compoundVariants: [
            {
                variant: 'flat',
                state: 'focused',
                styles: {
                    height: 2,
                    backgroundColor: theme.colors.primary,
                },
            },
            {
                variant: 'flat',
                state: 'hovered',
                styles: {
                    height: 1,
                    backgroundColor: theme.colors.onSurface,
                },
            },
            {
                variant: 'flat',
                state: 'errorHovered',
                styles: {
                    height: 1,
                    backgroundColor: theme.colors.onErrorContainer,
                },
            },
            {
                variant: 'flat',
                state: 'hoveredAndFocused',
                styles: {
                    height: 2,
                    backgroundColor: theme.colors.primary,
                },
            },
            {
                variant: 'flat',
                state: 'errorFocusedAndHovered',
                styles: {
                    height: 2,
                    backgroundColor: theme.colors.error,
                },
            },
            {
                variant: 'flat',
                state: 'disabled',
                styles: {
                    height: 1,
                    backgroundColor: theme.colors.onSurface,
                    opacity: 0.38,
                },
            },
            {
                variant: 'flat',
                state: 'error',
                styles: {
                    backgroundColor: theme.colors.error,
                },
            },
            {
                variant: 'flat',
                state: 'errorFocused',
                styles: {
                    height: 2,
                    backgroundColor: theme.colors.error,
                },
            },
            {
                variant: 'flat',
                state: 'errorDisabled',
                styles: {
                    height: 1,
                    backgroundColor: theme.colors.error,
                    opacity: 0.38,
                },
            },
        ],
    },
    stateLayer: {
        compoundVariants: [
            {
                variant: 'flat',
                state: 'hovered',
                styles: {
                    backgroundColor: theme.colors.stateLayer.hover.onSurface,
                },
            },
            {
                variant: 'flat',
                state: 'errorHovered',
                styles: {
                    backgroundColor: theme.colors.stateLayer.hover.onSurface,
                },
            },
        ],
    },
    underline: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 1,
        zIndex: 1,
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
}));
