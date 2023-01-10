import type { ComponentStylePropWithVariants } from '../../types';
import type { TextStyle, ViewStyle } from 'react-native';

type DrawerCustomProps = {};

export const drawerStyles: ComponentStylePropWithVariants<ViewStyle, '', DrawerCustomProps> = {
    borderTopRightRadius: 'shapes.corner.large' as unknown as number,
    borderBottomRightRadius: 'shapes.corner.large' as unknown as number,
    overflow: 'hidden',
    backgroundColor: 'colors.surface',
    minWidth: 360,
    flexGrow: 1,
};

export const drawerContentStyles: ComponentStylePropWithVariants<ViewStyle> = {
    paddingHorizontal: 'spacings.3',
};

export const drawerHeaderStyles: ComponentStylePropWithVariants<ViewStyle> = {};

export const drawerFooterStyles: ComponentStylePropWithVariants<ViewStyle> = {};

type DrawerItemStates = 'activeAndHovered' | 'active' | 'hovered';
type DrawerItemCustomProps = {
    leftElement?: ViewStyle;
    rightElement?: ViewStyle;
    content?: ViewStyle;
    label?: TextStyle;
    leftElementColor?: string;
    rightElementColor?: string;
};

export const drawerItemStyles: ComponentStylePropWithVariants<
    ViewStyle,
    DrawerItemStates,
    DrawerItemCustomProps
> = {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 'shapes.corner.full' as unknown as number,
    paddingLeft: 'spacings.4',
    paddingRight: 'spacings.6',

    leftElementColor: 'colors.onSurfaceVariant',
    rightElementColor: 'colors.onSurfaceVariant',

    leftElement: {
        marginRight: 'spacings.3',
    },
    rightElement: {
        marginLeft: 'spacings.3',
    },

    content: {
        flexDirection: 'row',
        flex: 1,
    },

    label: {
        color: 'colors.onSurfaceVariant',
        lineHeight: 'typescale.labelLarge.lineHeight' as unknown as number,
        fontSize: 'typescale.labelLarge.fontSize' as unknown as number,
        fontWeight: 'typescale.labelLarge.fontWeight' as unknown as TextStyle['fontWeight'],
        flexGrow: 1,
    },

    states: {
        activeAndHovered: {
            backgroundColor: 'colors.secondaryContainer',

            leftElementColor: 'colors.onSecondaryContainer',

            label: {
                color: 'colors.onSecondaryContainer',
            },
        },
        active: {
            backgroundColor: 'colors.secondaryContainer',

            leftElementColor: 'colors.onSecondaryContainer',

            label: {
                color: 'colors.onSecondaryContainer',
            },
        },
        hovered: {
            backgroundColor: 'colors.stateLayer.hover.onSurface',
        },
    },
};
