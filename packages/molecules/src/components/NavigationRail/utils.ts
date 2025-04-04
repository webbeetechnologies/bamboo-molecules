import { Platform } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export const navigationRailStyles = StyleSheet.create(theme => ({
    root: {
        width: 80,
        backgroundColor: theme.colors.surface,
        flexGrow: 1,
    },
}));

export const navigationRailHeaderStyles = StyleSheet.create({
    root: {
        alignItems: 'center',
    },
});

export const navigationRailContentStyles = StyleSheet.create({
    root: {
        flexGrow: 1,
    },
});

export const navigationRailFooterStyles = StyleSheet.create({
    root: {
        alignItems: 'center',
    },
});

// type ItemStates = 'activeAndHovered' | 'active' | 'hovered';

export const navigationRailItemStyles = StyleSheet.create(theme => ({
    root: {
        ...(Platform.OS === 'web' ? { cursor: 'pointer' } : {}),
        alignItems: 'center',
        marginBottom: theme.spacings['3'],
        iconSize: 24,
    },

    iconContainer: {
        borderRadius: theme.shapes.corner.full,
        alignItems: 'center',
        justifyContent: 'center',
        ...(Platform.OS === 'web' ? { cursor: 'pointer' } : {}),
        overflow: 'visible',

        variants: {
            state: {
                active: {
                    backgroundColor: theme.colors.secondaryContainer,
                },
                activeAndHovered: {
                    backgroundColor: theme.colors.secondaryContainer,
                },
            },

            size: {
                sm: {
                    width: 56,
                    height: 32,
                },
                md: {
                    width: 56,
                    height: 32,
                },
                lg: {
                    width: 56,
                    height: 32,
                },
            },
        },
    },
    icon: {
        color: theme.colors.onSurfaceVariant,
        position: 'relative',

        variants: {
            state: {
                active: {
                    color: theme.colors.onSecondaryContainer,
                },
                activeAndHovered: {
                    color: theme.colors.onSecondaryContainer,
                },
            },
        },
    },
    badge: {
        position: 'absolute',
        bottom: '75%',
        left: '75%',
        zIndex: 2,
    },

    label: {
        ...theme.typescale.labelMedium,
        color: theme.colors.onSurfaceVariant,
        marginTop: theme.spacings['1'],
        justifyContent: 'center',

        variants: {
            state: {
                active: {
                    color: theme.colors.onSurface,
                },
                activeAndHovered: {
                    color: theme.colors.onSurface,
                },
            },
        },
    },

    stateLayer: {
        borderRadius: 'shapes.corner.full' as unknown as number,

        variants: {
            state: {
                hovered: {
                    backgroundColor: theme.colors.stateLayer.hover.onSurfaceVariant,
                },
                activeAndHovered: {
                    backgroundColor: theme.colors.stateLayer.hover.onSurface,
                },
            },
        },
    },
}));
