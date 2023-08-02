import { DataCell } from './DataTableCell';
import { DataTable as DataTableComponent } from './DataTable';
import { DataHeaderCell } from './DataTableHeader';

export * from './DataTableContext';

export {
    DataTableProps,
    RenderHeaderCellProps,
    RenderCellProps,
    DataCellProps,
    DataHeaderCellProps,
    DataTableRowProps,
    TDataTableColumn,
    TDataTableRow,
    UseRowRenderer,
} from './types';

export { dataTableCellStyles } from './DataTableCell';
export { dataTableRowStyles } from './DataTableRow';
export { dataTableStyles } from './utils';
export { dataTableHeaderCellStyles, dataTableHeaderStyles } from './DataTableHeader';

export const DataTable = Object.assign(DataTableComponent, {
    Cell: DataCell,
    HeaderCell: DataHeaderCell,
});
