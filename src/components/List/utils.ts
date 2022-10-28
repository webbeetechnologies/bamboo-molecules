import type { TextStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from 'src/types';

export type ListItemStylesProp = {
    titleStyle?: object;
    descriptionStyle?: object;
};

type States = 'disabled' | 'hovered' | 'focused' | 'pressed';

export const listItemStyles: ComponentStylePropWithVariants<TextStyle, States, ListItemStylesProp> =
    {
        titleStyle: { color: 'colors.onSurface' },
        descriptionStyle: { color: 'colors.onSurfaceVariants' },
        states: {
            disabled: {
                titleStyle: {
                    color: 'colors.surfaceDisabled',
                },
                descriptionStyle: {
                    color: 'colors.surfaceDisabled',
                },
            },
            hovered: {
                titleStyle: {
                    color: 'colors.surfaceDisabled',
                },
            },
            focused: {
                titleStyle: {
                    color: 'colors.onSurface',
                },
            },
            pressed: {
                titleStyle: {
                    color: 'colors.surfaceDisabled',
                },
            },
        },
    };

export const flatListStyles: ComponentStylePropWithVariants<TextStyle> = {};

export const sectionListStyles: ComponentStylePropWithVariants<TextStyle> = {
    color: 'colors.onSurface',
    fontSize: 32,
};
