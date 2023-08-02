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
    TDataTableColumn,
    TDataTableRow,
} from './types';

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
