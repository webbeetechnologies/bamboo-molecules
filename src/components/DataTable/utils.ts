import type { ComponentStyleProp } from '../../types';
import type { ViewStyle } from 'react-native';
import type { TDataTableRow } from './types';

export const keyExtractor = (_: TDataTableRow, i: number) => i + '';

// TODO: map the function a little more dynamic calculating the height and width.
export const getItemLayout = (_d: any, i: number) => ({ length: 32.5, offset: 32.5 * i, index: i });

export const dataTableStyles: ComponentStyleProp<ViewStyle> = {};
