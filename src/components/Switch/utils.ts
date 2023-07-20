import type { ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type CustomProp = { checkedColor?: string; thumbTintColor?: string; onTintColor?: string };

export const newSwitchStyles: ComponentStylePropWithVariants<
    ViewStyle,
    'selected_disabled' | 'active' | 'disabled',
    CustomProp
> = {
    thumbTintColor: 'colors.neutral1',
    onTintColor: 'colors.onNeutral1',

    states: {
        active: {
            thumbTintColor: 'colors.neutral1',
            onTintColor: 'colors.onNeutral1',
        },
        disabled: {
            thumbTintColor: 'colors.disabled',
            onTintColor: 'colors.disabledOnBackground',
        },
        selected_disabled: {
            thumbTintColor: 'colors.neutral1',
            onTintColor: 'colors.disabledOnBackground',
        },
    },
};
