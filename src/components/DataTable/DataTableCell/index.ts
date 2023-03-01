import type { ComponentStylePropWithResolvers } from '../../../types';
import type { ViewStyle } from 'react-native';

export { renderCellComponent, DataCell } from './DataTableCell';

export const dataTableCellStyles: ComponentStylePropWithResolvers<ViewStyle, ''> = {
    padding: 'spacings.1',
};
