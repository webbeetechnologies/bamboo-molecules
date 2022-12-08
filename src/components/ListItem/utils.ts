import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type ListItemStylesProp = {
    color?: string;
    innerContainer?: StyleProp<ViewStyle>;
    content?: StyleProp<ViewStyle>;
    leftElement?: StyleProp<ViewStyle>;
    rightElement?: StyleProp<ViewStyle>;
};

type States = 'disabled' | 'hovered' | 'pressable';

export const listItemStyles: ComponentStylePropWithVariants<ViewStyle, States, ListItemStylesProp> =
    {
        backgroundColor: 'colors.surface',
        paddingTop: 'spacings.2',
        paddingBottom: 'spacings.2',
        paddingLeft: 'spacings.4',
        paddingRight: 'spacings.6',

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
        },
    };

export const listItemTitleStyles: ComponentStylePropWithVariants<TextStyle> = {
    color: 'colors.onSurface',
    fontSize: 'typescale.bodyLarge.fontSize' as unknown as number,
    fontWeight: 'typescale.bodyLarge.fontWeight' as unknown as TextStyle['fontWeight'],
    lineHeight: 'typescale.bodyLarge.lineHeight' as unknown as number,
};

export const listItemDescriptionStyles: ComponentStylePropWithVariants<TextStyle> = {
    color: 'colors.onSurfaceVariant',
    fontSize: 'typescale.bodyMedium.fontSize' as unknown as number,
    fontWeight: 'typescale.bodyMedium.fontWeight' as unknown as TextStyle['fontWeight'],
    lineHeight: 'typescale.bodyMedium.lineHeight' as unknown as number,
};
