import type { StyleProp, TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from 'src/types';

export type ListItemStylesProp = {
    color?: string;
    titleStyle?: StyleProp<TextStyle>;
    leftElement?: StyleProp<ViewStyle>;
    rightElement?: StyleProp<ViewStyle>;
};

type States = 'disabled' | 'hovered' | 'focused' | 'pressed';

export const listItemStyles: ComponentStylePropWithVariants<ViewStyle, States, ListItemStylesProp> =
    {
        color: 'colors.surface',
        titleStyle: { color: 'colors.onSurface' },

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
                titleStyle: {
                    color: 'colors.surfaceDisabled',
                },
            },
            hovered: {
                titleStyle: {
                    color: 'colors.surfaceDisabled',
                },
            },
        },
    };

export const flatListStyles: ComponentStylePropWithVariants<TextStyle> = {};

export const sectionListStyles: ComponentStylePropWithVariants<TextStyle> = {};
