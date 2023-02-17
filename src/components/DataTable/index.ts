import { DataCell } from './DataTableCell';

export { DataTableProps, DataTableHeaderCellProps, DataTableCellProps } from './types';
import { DataTable as DataTableComponent } from './DataTable';
export * from './DataTableContext';

export { dataTableCellStyles } from './DataTableCell';
export { dataTableRowStyles } from './DataTableRow';
export { dataTableStyles } from './utils';

export const DataTable = Object.assign(DataTableComponent, {
    Cell: DataCell,
});
