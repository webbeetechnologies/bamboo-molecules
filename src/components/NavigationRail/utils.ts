import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';
import { StyleSheet } from 'react-native';

export const navigationRailStyles: ComponentStylePropWithVariants<ViewStyle> = {
    width: 80,
    backgroundColor: 'colors.surface',
    flexGrow: 1,
};

export const navigationRailHeaderStyles: ComponentStylePropWithVariants<ViewStyle> = {
    alignItems: 'center',
};

export const navigationRailContentStyles: ComponentStylePropWithVariants<ViewStyle> = {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
};

export const navigationRailFooterStyles: ComponentStylePropWithVariants<ViewStyle> = {
    alignItems: 'center',
};

type ItemStates = 'activeAndHovered' | 'active' | 'hovered';
type CustomProps = {
    iconContainer?: ViewStyle;
    icon?: TextStyle;
    badge?: ViewStyle;
    label?: TextStyle;
    stateLayer?: ViewStyle;
    iconSize?: number;
};
type CustomSizeProps = CustomProps & {};
export const navigationRailItemStyles: ComponentStylePropWithVariants<
    ViewStyle,
    ItemStates,
    CustomProps,
    CustomSizeProps
> = {
    // @ts-ignore
    cursor: 'pointer',
    alignItems: 'center',
    marginBottom: 'spacings.3',
    iconSize: 24,

    iconContainer: {
        borderRadius: 'shapes.corner.full' as unknown as number,
        alignItems: 'center',
        justifyContent: 'center',
        // @ts-ignore
        cursor: 'pointer',
        overflow: 'visible',
    },
    icon: {
        color: 'colors.onSurfaceVariant',
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        bottom: '75%',
        left: '75%',
        zIndex: 2,
    },

    label: {
        fontSize: 'typescale.labelMedium.fontSize' as unknown as number,
        lineHeight: 'typescale.labelMedium.lineHeight' as unknown as number,
        fontWeight: 'typescale.labelMedium.fontWeight' as unknown as TextStyle['fontWeight'],
        color: 'colors.onSurfaceVariant',
        marginTop: 'spacings.1',
        justifyContent: 'center',
    },

    stateLayer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
        borderRadius: 'shapes.corner.full' as unknown as number,
    },

    states: {
        hovered: {
            stateLayer: {
                backgroundColor: 'colors.stateLayer.hover.onSurfaceVariant',
            },
        },
        active: {
            iconContainer: {
                backgroundColor: 'colors.secondaryContainer',
            },
            icon: {
                color: 'colors.onSecondaryContainer',
            },
            label: {
                color: 'colors.onSurface',
            },
        },
        activeAndHovered: {
            iconContainer: {
                backgroundColor: 'colors.secondaryContainer',
            },
            stateLayer: {
                backgroundColor: 'colors.stateLayer.hover.onSurface',
            },
            icon: {
                color: 'colors.onSecondaryContainer',
            },
            label: {
                color: 'colors.onSurface',
            },
        },
    },

    sizes: {
        md: {
            iconContainer: {
                width: 56,
                height: 32,
            },
        },
    },
};
