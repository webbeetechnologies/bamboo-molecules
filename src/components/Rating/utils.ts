import type { TextStyle, ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';

type States = 'activeAndDisabled' | 'active' | 'disabled' | 'readonly' | 'activeAndReadonly';

export const ratingStyles: ComponentStylePropWithVariants<ViewStyle> = {
    flexDirection: 'row',
};

export const ratingItemStyles: ComponentStylePropWithVariants<TextStyle, States> = {
    color: 'colors.onSurfaceVariant',

    states: {
        disabled: {
            color: 'colors.disabled',
            opacity: 0.38,
        },
        activeAndDisabled: {
            opacity: 0.38,
        },
        readonly: {},
    },
};
