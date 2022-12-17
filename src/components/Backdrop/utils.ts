import type { ComponentStylePropWithVariants } from '../../types';
import type { ViewStyle } from 'react-native';

export const backdropStyles: ComponentStylePropWithVariants<ViewStyle> = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgb(0, 0, 0)',
    opacity: 0.3,
};
