import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type ListItemStylesProp = {
    color?: string;
    innerContainer?: StyleProp<ViewStyle>;
    content?: StyleProp<ViewStyle>;
    leftElement?: StyleProp<ViewStyle>;
    rightElement?: StyleProp<ViewStyle>;
};

type States = 'disabled' | 'hovered' | 'pressable' | 'selected';

export const listItemStyles: ComponentStylePropWithVariants<ViewStyle, States, ListItemStylesProp> =
    {
        backgroundColor: 'colors.surface',

        innerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },

        content: {
            flex: 1,
            justifyContent: 'center',
        },

        leftElement: {
            marginRight: 'spacings.3',
            marginLeft: 'spacings._1',
        },
        rightElement: {
            marginRight: 'spacings._1',
            marginLeft: 'spacings.3',
        },

        states: {
            disabled: {
                opacity: 0.38,
            },
            hovered: {},

            selected: {
                backgroundColor: 'colors.surfaceVariant',
            },
        },
        variants: {
            default: {
                paddingTop: 'spacings.2',
                paddingBottom: 'spacings.2',
                paddingLeft: 'spacings.4',
                paddingRight: 'spacings.6',
            },
            menuItem: {
                paddingVertical: 'spacings.2',
                paddingHorizontal: 'spacings.3',
                minHeight: 48,
                justifyContent: 'center',
            },
        },
    };

export const listItemTitleStyles: ComponentStylePropWithVariants<TextStyle> = {
    color: 'colors.onSurface',
    fontSize: 'typescale.bodyLarge.fontSize' as unknown as number,
    fontWeight: 'typescale.bodyLarge.fontWeight' as unknown as TextStyle['fontWeight'],
    lineHeight: 'typescale.bodyLarge.lineHeight' as unknown as number,

    variants: {
        menuItem: {
            fontSize: 'typescale.labelLarge.fontSize' as unknown as number,
            fontWeight: 'typescale.labelLarge.fontWeight' as unknown as TextStyle['fontWeight'],
            lineHeight: 'typescale.labelLarge.lineHeight' as unknown as number,
        },
    },
};

export const listItemDescriptionStyles: ComponentStylePropWithVariants<TextStyle> = {
    color: 'colors.onSurfaceVariant',
    fontSize: 'typescale.bodyMedium.fontSize' as unknown as number,
    fontWeight: 'typescale.bodyMedium.fontWeight' as unknown as TextStyle['fontWeight'],
    lineHeight: 'typescale.bodyMedium.lineHeight' as unknown as number,

    variants: {
        menuItem: {
            fontSize: 'typescale.bodySmall.fontSize' as unknown as number,
            fontWeight: 'typescale.bodySmall.fontWeight' as unknown as TextStyle['fontWeight'],
            lineHeight: 'typescale.bodySmall.lineHeight' as unknown as number,
        },
    },
};
