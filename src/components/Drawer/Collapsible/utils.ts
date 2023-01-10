import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../../types';

export const drawerCollapsibleStyles: ComponentStylePropWithVariants<ViewStyle> = {};

export const drawerCollapsibleItemStyles: ComponentStylePropWithVariants<ViewStyle> = {};

type CollapsibleItemHeaderStates = 'active';
type CollapsibleItemHeaderCustomProps = {
    elementColor?: string;
    leftElement?: ViewStyle;
    rightElement?: ViewStyle;
    content?: TextStyle;
};

export const drawerCollapsibleItemHeaderStyles: ComponentStylePropWithVariants<
    ViewStyle,
    CollapsibleItemHeaderStates,
    CollapsibleItemHeaderCustomProps
> = {
    states: {
        active: {
            backgroundColor: 'colors.stateLayer.hover.onSurface',
        },
    },
};

export const drawerCollapsibleItemContentStyles: ComponentStylePropWithVariants<ViewStyle> = {};
