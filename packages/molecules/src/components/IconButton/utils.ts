import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { StyleSheet } from 'react-native-unistyles';
import { IconButtonVariant } from './types';

type States = 'selectedAndDisabled' | 'disabled' | 'selected' | 'hovered' | 'selectedAndHovered';

const iconButtonStylesDefault = StyleSheet.create(theme => ({
    root: {
        borderColor: theme.colors.outline,
        color: theme.colors.onSurfaceVariant,
        borderRadius: theme.shapes.corner.full,
        overflow: 'hidden',
        borderWidth: 0,

        variants: {
            size: {
                xs: {
                    width: 26,
                    height: 26,
                    borderRadius: theme.shapes.corner.full,
                },
                sm: {
                    width: 30,
                    height: 30,
                    borderRadius: theme.shapes.corner.full,
                },
                md: {
                    width: 34,
                    height: 34,
                    borderRadius: theme.shapes.corner.full,
                },
                lg: {
                    width: 38,
                    height: 38,
                    borderRadius: theme.shapes.corner.full,
                },
            },
        },

        state: {
            disabled: {
                opacity: 0.38,
            },
            selectedAndDisabled: {
                opacity: 0.38,
            },
        },

        variant: {
            default: {},

            contained: {
                backgroundColor: theme.colors.surfaceVariant,
                color: theme.colors.primary,
            },

            'contained-tonal': {
                backgroundColor: theme.colors.surfaceVariant,
                color: theme.colors.onSurfaceVariant,
            },

            outlined: {
                color: theme.colors.onSurfaceVariant,
                borderWidth: 1,
            },
        },
    },
    stateLayer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
        zIndex: -1,
    },

    innerContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    compoundVariantStyles: (variant: IconButtonVariant, state: States) => {
        if (variant === 'default') {
            return {
                ...(state === 'selectedAndDisabled' && {
                    root: {
                        color: theme.colors.primary,
                    },
                }),
                ...(state === 'selected' && {
                    root: {
                        color: theme.colors.primary,
                    },
                }),
                ...(state === 'selectedAndHovered' && {
                    root: {
                        color: theme.colors.primary,
                        stateLayer: {
                            backgroundColor: theme.colors.stateLayer.hover.primary,
                        },
                    },
                }),
                ...(state === 'hovered' && {
                    root: {
                        stateLayer: {
                            backgroundColor: theme.colors.stateLayer.hover.onSurfaceVariant,
                        },
                    },
                }),
            } as any;
        }

        if (variant === 'contained') {
            return {
                ...(state === 'selectedAndDisabled' && {
                    root: {
                        backgroundColor: theme.colors.primary,
                        color: theme.colors.onPrimary,
                    },
                }),
                ...(state === 'disabled' && {
                    root: {
                        backgroundColor: theme.colors.stateLayer.disabled.onSurface,
                    },
                }),
                ...(state === 'selected' && {
                    root: {
                        backgroundColor: theme.colors.primary,
                        color: theme.colors.onPrimary,
                    },
                }),
                ...(state === 'selectedAndHovered' && {
                    root: {
                        color: theme.colors.primary,
                        stateLayer: {
                            backgroundColor: theme.colors.stateLayer.hover.primary,
                        },
                    },
                }),
                ...(state === 'hovered' && {
                    root: {
                        backgroundColor: theme.colors.primary,
                        color: theme.colors.onPrimary,

                        stateLayer: {
                            backgroundColor: theme.colors.stateLayer.hover.onPrimary,
                        },
                    },
                }),
            } as any;
        }

        if (variant === 'contained-tonal') {
            return {
                ...(state === 'selectedAndDisabled' && {
                    root: {
                        backgroundColor: theme.colors.secondaryContainer,
                        color: theme.colors.onSecondaryContainer,
                    },
                }),
                ...(state === 'disabled' && {
                    root: {
                        backgroundColor: theme.colors.stateLayer.disabled.onSurface,
                    },
                }),
                ...(state === 'selected' && {
                    root: {
                        backgroundColor: theme.colors.secondaryContainer,
                        color: theme.colors.onSecondaryContainer,
                    },
                }),
                ...(state === 'selectedAndHovered' && {
                    root: {
                        backgroundColor: theme.colors.secondaryContainer,
                        color: theme.colors.onSecondaryContainer,

                        stateLayer: {
                            backgroundColor: theme.colors.stateLayer.hover.onSecondaryContainer,
                        },
                    },
                }),
                ...(state === 'hovered' && {
                    root: {
                        stateLayer: {
                            backgroundColor: theme.colors.stateLayer.hover.onSurfaceVariant,
                        },
                    },
                }),
            } as any;
        }

        if (variant === 'outlined') {
            return {
                ...(state === 'selectedAndDisabled' && {
                    root: {
                        backgroundColor: theme.colors.inverseSurface,
                        color: theme.colors.inverseOnSurface,
                        borderWidth: 0,
                    },
                }),
                ...(state === 'disabled' && {
                    root: {
                        borderColor: theme.colors.onSurface,
                    },
                }),
                ...(state === 'selected' && {
                    root: {
                        backgroundColor: theme.colors.inverseSurface,
                        color: theme.colors.inverseOnSurface,
                        borderWidth: 0,
                    },
                }),
                ...(state === 'selectedAndHovered' && {
                    root: {
                        backgroundColor: theme.colors.secondaryContainer,
                        color: theme.colors.onSecondaryContainer,

                        stateLayer: {
                            backgroundColor: theme.colors.stateLayer.hover.onSecondaryContainer,
                        },
                    },
                }),
                ...(state === 'hovered' && {
                    root: {
                        backgroundColor: theme.colors.inverseSurface,
                        color: theme.colors.inverseOnSurface,
                        borderWidth: 0,

                        stateLayer: {
                            backgroundColor: theme.colors.stateLayer.hover.inverseOnSurface,
                        },
                    },
                }),
            } as any;
        }

        return {};
    },
}));

registerComponentsStyles({
    iconButtonStyles: iconButtonStylesDefault,
});

export const defaultStyles = getRegisteredMoleculesComponentStyles('iconButtonStyles');
