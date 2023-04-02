import type { ViewStyle } from 'react-native';
import type { ComponentStylePropWithVariants } from '../../types';
import { StyleSheet } from 'react-native';

export const stateLayerStyles: ComponentStylePropWithVariants<ViewStyle> = {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    zIndex: -1,
};
