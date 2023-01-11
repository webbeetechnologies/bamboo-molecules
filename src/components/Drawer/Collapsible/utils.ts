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
    content: {
        color: 'colors.onSurfaceVariant',
        lineHeight: 'typescale.labelLarge.lineHeight' as unknown as number,
        fontSize: 'typescale.labelLarge.fontSize' as unknown as number,
        fontWeight: 'typescale.labelLarge.fontWeight' as unknown as TextStyle['fontWeight'],
    },
    leftElement: {},
    rightElement: {},

    states: {
        active: {
            backgroundColor: 'colors.stateLayer.hover.onSurface',
        },
    },
};

export const drawerCollapsibleItemContentStyles: ComponentStylePropWithVariants<ViewStyle> = {};
