import type { ComponentStylePropWithResolvers } from '../../../types';
import type { ViewStyle } from 'react-native';

export { renderCell, DataCell } from './DataTableCell';

export const dataTableCellStyles: ComponentStylePropWithResolvers<ViewStyle, ''> = {
    padding: 'spacings.1',
};
