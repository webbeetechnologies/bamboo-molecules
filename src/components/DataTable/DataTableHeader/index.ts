import type { ComponentStyleProp } from '../../../types';
import type { TextStyle, ViewStyle } from 'react-native';

export * from './DataTableHeader';

export const dataTableHeaderStyles: ComponentStyleProp<ViewStyle> = {
    backgroundColor: 'colors.surface',
    padding: 'spacings.1',
    alignSelf: 'flex-start',
};

export const dataTableHeaderCellStyles: ComponentStyleProp<ViewStyle & TextStyle> = {
    padding: 'spacings.1',
};
