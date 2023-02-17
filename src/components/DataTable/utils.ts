import type { ComponentStyleProp } from '../../types';
import type { ViewStyle } from 'react-native';

export const keyExtractor = (item: { id: string }) => item.id;

export const dataTableStyles: ComponentStyleProp<ViewStyle> = {};
