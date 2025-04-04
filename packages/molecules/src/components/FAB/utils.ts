import { StyleSheet } from 'react-native-unistyles';

export type States = 'hovered' | 'disabled';

export const fabStyles = StyleSheet.create(theme => ({
    root: {
        ...{ iconSize: 24 },

        variants: {
            state: {
                disabled: {
                    backgroundColor: theme.colors.surfaceDisabled,
                },
            },

            variant: {
                primary: {
                    backgroundColor: theme.colors.primaryContainer,
                },
                secondary: {
                    backgroundColor: theme.colors.secondaryContainer,
                },
                tertiary: {
                    backgroundColor: theme.colors.tertiaryContainer,
                },
                surface: {
                    backgroundColor: theme.colors.surface,
                },
            },

            size: {
                sm: {
                    iconSize: 24,
                    minHeight: 40,
                    minWidth: 40,
                    borderRadius: theme.shapes.corner.medium,
                },
                md: {
                    iconSize: 24,
                    minHeight: 56,
                    minWidth: 56,
                    borderRadius: theme.shapes.corner.large,
                },
                lg: {
                    iconSize: 36,
                    minHeight: 96,
                    minWidth: 96,
                    borderRadius: theme.shapes.corner.extraLarge,
                },
            },
        },
    },

    innerContainer: {
        flexGrow: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

        size: {
            sm: {
                padding: theme.spacings['3'],
                borderRadius: theme.shapes.corner.medium,
            },
            md: {
                padding: theme.spacings['4'],
                borderRadius: theme.shapes.corner.large,
            },
            lg: {
                padding: theme.spacings['7'],
                borderRadius: theme.shapes.corner.extraLarge,
            },
        },
    },

    stateLayer: {
        variants: {
            state: {
                disabled: {
                    backgroundColor: theme.colors.stateLayer.disabled.onSurface,
                },
            },

            size: {
                sm: {
                    borderRadius: theme.shapes.corner.medium,
                },
                md: {
                    borderRadius: theme.shapes.corner.large,
                },
                lg: {
                    borderRadius: theme.shapes.corner.extraLarge,
                },
            },
        },
        compoundVariants: [
            {
                variant: 'primary',
                state: 'hovered',
                styles: {
                    backgroundColor: theme.colors.stateLayer.hover.onPrimaryContainer,
                },
            },
            {
                variant: 'secondary',
                state: 'hovered',
                styles: {
                    backgroundColor: theme.colors.stateLayer.hover.onSecondaryContainer,
                },
            },
            {
                variant: 'tertiary',
                state: 'hovered',
                styles: {
                    backgroundColor: theme.colors.stateLayer.hover.onTertiaryContainer,
                },
            },
            {
                variant: 'surface',
                state: 'hovered',
                styles: {
                    backgroundColor: theme.colors.stateLayer.hover.primary,
                },
            },
        ],
    },

    icon: {
        variants: {
            state: {
                disabled: {
                    color: theme.colors.onSurfaceDisabled,
                },
            },

            variant: {
                primary: {
                    color: theme.colors.onPrimaryContainer,
                },
                secondary: {
                    color: theme.colors.onSecondaryContainer,
                },
                tertiary: {
                    color: theme.colors.onTertiaryContainer,
                },
                surface: {
                    color: theme.colors.primary,
                },
            },
        },
    },

    label: {
        variants: {
            state: {
                disabled: {
                    color: theme.colors.onSurfaceDisabled,
                },
            },

            variant: {
                primary: {
                    color: theme.colors.onPrimaryContainer,
                },
                secondary: {
                    color: theme.colors.onPrimaryContainer,
                },
                tertiary: {
                    color: theme.colors.onPrimaryContainer,
                },
                surface: {
                    color: theme.colors.primary,
                },
            },

            size: {
                sm: {
                    ...theme.typescale.labelMedium,
                    marginLeft: theme.spacings['1'],
                },
                md: {
                    ...theme.typescale.labelLarge,
                    marginLeft: theme.spacings['2'],
                },
                lg: {
                    ...theme.typescale.bodyExtraLarge,
                    marginLeft: theme.spacings['3'],
                },
            },
        },
    },
}));
