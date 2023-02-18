import { DataCell } from './DataTableCell';

export { DataTableProps, DataTableHeaderCellProps, DataTableCellProps } from './types';
import { DataTable as DataTableComponent } from './DataTable';
import { DataHeaderCell } from './DataTableHeader';
export * from './DataTableContext';

export { dataTableCellStyles } from './DataTableCell';
export { dataTableRowStyles } from './DataTableRow';
export { dataTableStyles } from './utils';
export { dataTableHeaderCellStyles, dataTableHeaderStyles } from './DataTableHeader';

export const DataTable = Object.assign(DataTableComponent, {
    Cell: DataCell,
    HeaderCell: DataHeaderCell,
});
