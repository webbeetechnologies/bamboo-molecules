import type { ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

export const navigationRailStyles: ComponentStylePropWithVariants<ViewStyle> = {};

export const navigationRailHeaderStyles: ComponentStylePropWithVariants<ViewStyle> = {};

export const navigationRailContentStyles: ComponentStylePropWithVariants<ViewStyle> = {};

export const navigationRailFooterStyles: ComponentStylePropWithVariants<ViewStyle> = {};

type ItemStates = 'activeAndHovered' | 'active' | 'hovered';
type CustomProps = {};
export const navigationRailItemStyles: ComponentStylePropWithVariants<
    ViewStyle,
    ItemStates,
    CustomProps
> = {};
