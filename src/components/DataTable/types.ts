import type { ComponentPropsWithRef, ComponentType, ReactNode } from 'react';
import type { FlatListProps, ScrollViewProps, ViewProps } from 'react-native';
import type { ScrollView } from 'react-native';

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
    ScrollViewComponent?: ComponentType<ComponentPropsWithRef<typeof ScrollView>>;
}

export type DataTableHeaderCellProps = {
    columnIndex: number;
    column: TDataTableColumn;
};

export type DataTableCellProps = {
    row: TDataTableRow;
    rowIndex: number;
} & DataTableHeaderCellProps;

export type ScrollProps = {
    verticalScrollProps?: Omit<FlatListProps<any>, 'data' | 'renderItem'>;
    horizontalScrollProps?: ScrollViewProps;
};

export interface DataTableProps<RecordType = any>
    extends Omit<ScrollViewProps, 'children'>,
        Partial<DataTableComponentProps<RecordType>>,
        ScrollProps {
    /**
     *
     * defaultColumnWidth
     * @default 150
     */
    defaultColumnWidth?: number;

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
     * @param cell: { columnIndex: number, column: {id: string}, rowIndex: number, row: {id: string} }
     */
    renderCell: (cell: DataTableCellProps) => ReactNode;

    /**
     *
     * @param cell: { columnIndex: number, column: {id: string} }
     */
    renderHeader: (cell: DataTableHeaderCellProps) => ReactNode;

    /**
     * Props for the header cell.
     * Caution: Use memoized props for best performance
     */
    headerCellProps?: Omit<ViewProps, 'children'>;

    /**
     * Props for the data cell.
     * Caution: Use memoized props for best performance
     */
    cellProps?: Omit<ViewProps, 'children'>;

    /**
     * Props for the header row.
     * Caution: Use memoized props for best performance
     */
    headerRowProps?: Omit<ViewProps, 'children'>;

    /**
     * Props for the data row.
     * Caution: Use memoized props for best performance
     */
    rowProps?: Omit<ViewProps, 'children'>;
}
