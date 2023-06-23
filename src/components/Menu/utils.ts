import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type MenuCustomProps = {
    backdrop?: ViewStyle;
    container?: ViewStyle;
};

type MenuItemCustomProps = {
    text?: TextStyle;
    leftElement?: ViewStyle;
    rightElement?: ViewStyle;
    stateLayer?: ViewStyle;
};

export const menuStyles: ComponentStylePropWithVariants<ViewStyle, '', MenuCustomProps> = {
    paddingVertical: 'spacings.2',
    backgroundColor: 'colors.surface',
    minWidth: 112,
    maxWidth: 280,
    borderRadius: 'shapes.corner.small' as unknown as number,
    display: 'flex',
    flexDirection: 'column',

    backdrop: {
        opacity: 0,
    },
    container: {
        padding: 0,
        borderRadius: 'shapes.corner.small' as unknown as number,
    },
};

export const menuItemStyles: ComponentStylePropWithVariants<
    ViewStyle,
    'disabled' | 'hovered',
    MenuItemCustomProps,
    { text?: TextStyle }
> = {
    paddingVertical: 'spacings.2',
    flexDirection: 'row',
    alignItems: 'center',

    text: {
        flex: 1,
    },

    leftElement: {
        marginRight: 'spacings.5',
        marginLeft: 'spacings.2',
    },
    rightElement: {
        marginRight: 'spacings.2',
        marginLeft: 'spacings.5',
    },

    states: {
        disabled: {
            opacity: 0.38,

            stateLayer: {
                backgroundColor: 'transparent',
            },
        },
        hovered: {
            stateLayer: {
                backgroundColor: 'colors.stateLayer.hover.onSurface',
            },
        },
    },

    sizes: {
        default: {
            paddingHorizontal: 'spacings.4',
            height: 48,

            text: {
                fontSize: 'typescale.bodyLarge.fontSize' as unknown as number,
                fontWeight: 'typescale.bodyLarge.fontWeight' as unknown as TextStyle['fontWeight'],
                lineHeight: 'typescale.bodyLarge.lineHeight' as unknown as number,
            },
        },

        dense: {
            paddingLeft: 'spacings.4',
            paddingRight: 'spacings.2',
            height: 32,

            text: {
                fontSize: 'typescale.bodyMedium.fontSize' as unknown as number,
                fontWeight: 'typescale.bodyMedium.fontWeight' as unknown as TextStyle['fontWeight'],
                lineHeight: 'typescale.bodyMedium.lineHeight' as unknown as number,
            },
        },
    },
};
