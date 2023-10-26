import { DataCell } from './DataTableCell';
import { DataTable as DataTableComponent } from './DataTable';
import { DataHeaderCell } from './DataTableHeader';

export { useStoreRef as useDataTableHorizontalScrollIndexStoreRef } from './hooks';

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
    TDataTableRowTruthy,
    UseRowRenderer,
    LoadMoreRowsArg,
    LoadMoreRows,
} from './types';

export * from './hoc';

export {
    dataTableCellStyles,
    renderCellComponent as renderDataTableCellComponent,
} from './DataTableCell';
export { dataTableRowStyles } from './DataTableRow';
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
