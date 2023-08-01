import { DataCell } from './DataTableCell';

export {
    DataTableProps,
    RenderHeaderCellProps,
    RenderCellProps,
    DataCellProps,
    DataHeaderCellProps,
} from './types';
import { DataTable as DataTableComponent } from './DataTable';
import { DataHeaderCell } from './DataTableHeader';
export * from './DataTableContext';

export {
    dataTableCellStyles,
    renderCellComponent as renderDataTableCellComponent,
} from './DataTableCell';
export { dataTableRowStyles, renderRow as renderDataTableRow } from './DataTableRow';
export { dataTableStyles } from './utils';
export {
    dataTableHeaderCellStyles,
    dataTableHeaderStyles,
    renderHeaderCell as renderDataTableHeaderCell,
} from './DataTableHeader';

export const DataTable = Object.assign(DataTableComponent, {
    Cell: DataCell,
    HeaderCell: DataHeaderCell,
});
