import type { ComponentPropsWithRef, ComponentType, ReactNode } from 'react';
import type { FlatListProps, ScrollViewProps, ViewProps } from 'react-native';
import type { ScrollView } from 'react-native';

type RowProps = Omit<ViewProps, 'children'> & { size?: string };

export type TDataTableColumn = string | number;

export type TDataTableRow = string | number;

export interface DataTableComponentProps<T = any> {
    FlatListComponent?: ComponentType<FlatListProps<T>>;
    ScrollViewComponent?: ComponentType<ComponentPropsWithRef<typeof ScrollView>>;
}

export type DataHeaderCellProps = ViewProps & { width: number };
export type DataCellProps = ViewProps & {
    width: number;
};

export type RenderHeaderCellProps = {
    columnIndex: number;
    column: TDataTableColumn;
};

export type RenderCellProps = {
    row: TDataTableRow;
    rowIndex: number;
} & RenderHeaderCellProps;

export type ScrollProps = {
    verticalScrollProps?: Omit<FlatListProps<any>, 'data' | 'renderItem'>;
    horizontalScrollProps?: ScrollViewProps;
};

export type DataTableBase = ScrollProps & {
    stickyRowIndices?: number[];
    HeaderRowComponent?: ComponentType<any>;
};

export type DataTableRowProps = {
    rowId: TDataTableRow;
    index: number;
    columns: TDataTableColumn[];
    rowProps?: RowProps;
    isSelected?: boolean;
};

export type UseRowRenderer<T extends DataTableRowProps = DataTableRowProps> = (
    props: Pick<DataTableRowProps, 'rowId' | 'index'>,
    DefaultComponent: ComponentType<DataTableRowProps>,
) => ComponentType<T> | undefined;

export interface DataTableProps<RecordType = any>
    extends Omit<ScrollViewProps, 'children'>,
        Partial<DataTableComponentProps<RecordType>>,
        DataTableBase {
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
    renderCell: (cell: RenderCellProps) => ReactNode;

    /**
     *
     * @param cell: { columnIndex: number, column: {id: string} }
     */
    renderHeader: (cell: RenderHeaderCellProps) => ReactNode;

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
    rowProps?: RowProps;

    /**
     *
     * if present, enables row selection in the table.
     *
     */
    selectedRows?: Record<string, boolean>;

    /**
     *
     * if present, allows you to set the size of all the rows.
     *
     */
    rowSize?: string;
    /**
     *
     * if present, defines the width of a cell on the basis of the column name.
     * the default width will be use otherwise
     *
     */
    columnWidths?: Record<TDataTableColumn, number>;
    /**
     *
     * DataTableRowProps
     */
    useRowRenderer?: UseRowRenderer;
    /**
     *
     * CellWrapperComponent
     */
    CellWrapperComponent?: ComponentType<DataCellProps>;
}
