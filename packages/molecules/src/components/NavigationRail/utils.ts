import { getRegisteredMoleculesComponentStyles, registerComponentsStyles } from '../../core';
import { Platform } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const navigationRailStylesDefault = StyleSheet.create(theme => ({
    root: {
        width: 80,
        backgroundColor: theme.colors.surface,
        flexGrow: 1,
    },
}));

const navigationRailHeaderStylesDefault = StyleSheet.create({
    root: {
        alignItems: 'center',
    },
});

const navigationRailContentStylesDefault = StyleSheet.create({
    root: {
        flexGrow: 1,
    },
});

const navigationRailFooterStylesDefault = StyleSheet.create({
    root: {
        alignItems: 'center',
    },
});

const navigationRailItemStylesDefault = StyleSheet.create(theme => ({
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

registerComponentsStyles({
    NavigationRail: navigationRailStylesDefault,
    NavigationRail_Header: navigationRailHeaderStylesDefault,
    NavigationRail_Content: navigationRailContentStylesDefault,
    NavigationRail_Footer: navigationRailFooterStylesDefault,
    NavigationRail_Item: navigationRailItemStylesDefault,
});

export const navigationRailStyles = getRegisteredMoleculesComponentStyles('NavigationRail');
export const navigationRailHeaderStyles =
    getRegisteredMoleculesComponentStyles('NavigationRail_Header');
export const navigationRailContentStyles =
    getRegisteredMoleculesComponentStyles('NavigationRail_Content');
export const navigationRailFooterStyles =
    getRegisteredMoleculesComponentStyles('NavigationRail_Footer');
export const navigationRailItemStyles =
    getRegisteredMoleculesComponentStyles('NavigationRail_Item');
