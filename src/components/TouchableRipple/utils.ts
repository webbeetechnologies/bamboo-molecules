import type { ComponentStylePropWithVariants } from '../../types';
import type { ViewStyle } from 'react-native';

export interface CustomProps {
    rippleColor?: string;
    cursor?: string;
}

export const touchableRippleStyles: ComponentStylePropWithVariants<
    ViewStyle,
    'pressable',
    CustomProps
> = {
    rippleColor: 'colors.onSurfaceRipple',

    states: {
        pressable: {
            cursor: 'pointer',
        },
    },
};
