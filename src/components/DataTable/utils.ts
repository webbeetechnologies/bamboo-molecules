import type { ComponentStyleProp } from '../../types';
import type { ViewStyle } from 'react-native';

export const keyExtractor = (item: { id: string }) => item.id;

// TODO: map the function a little more dynamic calculating the height and width.
export const getItemLayout = (_d: any, i: number) => ({ length: 32.5, offset: 32.5 * i, index: i });

export const dataTableStyles: ComponentStyleProp<ViewStyle> = {};
