import type { ComponentType, ReactNode } from 'react';
import type { FlatListProps, ScrollViewProps } from 'react-native';

export type TDataTableColumn = {
    /**
     * Unique identifier for the column
     */
    id: string;

    /**
     * Un-opinionated data structure for Columns
     * Component consumer could choose to dump column meta: sort, width, or any other properties they think relevant to their table
     */
    [k: string]: any;
};

export type TDataTableRow = {
    /**
     * Unique identifier for the column
     */
    id: string;

    /**
     * Un-opinionated data structure for Row
     * Component consumer could choose to structure their data in any way they chose
     */
    [k: string]: any;
};

export interface DataTableComponentProps<T = any> {
    FlatListComponent?: ComponentType<FlatListProps<T>>;
    ScrollViewComponent?: ComponentType<ScrollViewProps>;
}

export type DataTableHeaderCellProps = {
    columnIndex: number;
    column: TDataTableColumn;
};

export type DataTableCellProps = {
    row: TDataTableRow;
    rowIndex: number;
} & DataTableHeaderCellProps;

export type ScrollProps<T> = {
    verticalScrollProps?: FlatListProps<T>;
    horizontalScrollProps?: ScrollViewProps;
};

export interface DataTableProps<RecordType = any>
    extends Partial<DataTableComponentProps<RecordType>>,
        ScrollProps<RecordType> {
    /**
     *
     * Height of a row
     * @default 40
     */
    rowHeight?: number;

    /**
     *
     * Defines the headers of the table.
     * The component doesn't care about additional properties except the id; all the columns passed will be rendered.
     * If the component consumer wants to implement hiding columns, a filtered list of columns must be passed to the DataTable.
     *
     */

    columns: TDataTableColumn[];

    /**
     *
     * Defines the records to display.
     * DataTable doesn't natively implement filtering, however, that can easily be done using DataSource by the component consumer.
     *
     */
    records: TDataTableRow[];

    /**
     *
     * @param row: The row that is rendered.
     * @param column: The column which is rendered
     * @param index: of the row that is rendered
     */
    renderCell: (cell: DataTableCellProps) => ReactNode;

    /**
     *
     * @param row: The row that is rendered.
     * @param column: The column which is rendered
     * @param index: of the row that is rendered
     */
    renderHeader: (cell: DataTableHeaderCellProps) => ReactNode;
}
