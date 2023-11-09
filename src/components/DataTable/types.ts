import type { ComponentPropsWithRef, ComponentType, ReactNode, ForwardedRef } from 'react';
import type { ScrollViewProps, ViewProps, ViewStyle, ScrollView } from 'react-native';
import type { ViewAbilityConfigPair } from 'src/datagrid/types';
import type {
    VariableSizeListProps,
    InfiniteLoaderProps,
    VariableSizeList,
} from '@bambooapp/virtualized-list';

type RowProps = Omit<ViewProps, 'children'> & { size?: string };

export type TDataTableColumn = string | number;

export type TDataTableRowTruthy = string | number;
export type TDataTableRow = TDataTableRowTruthy | undefined;

export interface DataTableComponentProps {
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
    verticalScrollProps?: Omit<
        VariableSizeListProps,
        'itemSize' | 'itemCount' | 'itemKey' | 'estimatedItemSize' | 'onItemsRendered'
    > & {
        viewabilityConfigCallbackPairs?: ViewAbilityConfigPair[];
    };
    horizontalScrollProps?: ScrollViewProps;
};

export type DataTableBase = ScrollProps & {
    stickyRowIndices?: number[];
    HeaderRowComponent?: ComponentType<any>;
};

export type DataTableRowProps = {
    rowId: TDataTableRowTruthy;
    index: number;
    columns: TDataTableColumn[];
    rowProps?: RowProps;
    isSelected?: boolean;
    style?: ViewStyle;
};

export type UseRowRenderer<T extends DataTableRowProps = DataTableRowProps> = (
    props: Pick<DataTableRowProps, 'rowId' | 'index'>,
    DefaultComponent: ComponentType<DataTableRowProps>,
) => ComponentType<T> | undefined;

export type LoadMoreRowsArg = Parameters<
    Exclude<VariableSizeListProps['onItemsRendered'], undefined>
>[0] & {
    startIndex: number;
    stopIndex: number;
};

export type LoadMoreRows = (arg: LoadMoreRowsArg, forced?: boolean) => void;

export interface DataTableProps
    extends Omit<ScrollViewProps, 'children'>,
        Partial<DataTableComponentProps>,
        DataTableBase {
    /**
     *
     * defaultColumnWidth
     * @default 150
     */
    defaultColumnWidth?: number;

    /**
     *
     * horizontalOffsetWidth: The value is multipled by two so that the offset is applied to the left and right of the table.
     * @default 0
     *
     */
    horizontalOffset?: number;

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
    virtualListRef?: ForwardedRef<VariableSizeList>;
    infiniteLoaderRef?: ForwardedRef<any>;

    /**
     *
     * define the height of the row
     *
     */
    getRowSize: (index: number) => number;

    /**
     *
     * Optional row count; prefer to use records length if you have all the records loaded upfront.
     */
    rowCount?: VariableSizeListProps['itemCount'];

    /**
     *
     * Window size outside the viewport to see; is vector based.
     *
     */
    rowOverscanCount?: VariableSizeListProps['overscanCount'];
    rowKey?: VariableSizeListProps['itemKey'];
    estimatedRowSize?: VariableSizeListProps['estimatedItemSize'];

    /**
     *
     * Triggered everytime a row is rendered.
     *
     */
    onRowsRendered?: VariableSizeListProps['onItemsRendered'];
    rowsLoadingThreshold?: InfiniteLoaderProps['threshold'];

    /**
     *
     * Infinite loader callback.
     * minimum batch size to fetch records.
     *
     */
    rowsMinimumBatchSize?: InfiniteLoaderProps['minimumBatchSize'];

    /**
     *
     * Infinite loader callback.
     * Will trigger everytime a new row is required to be loaded
     *
     */
    loadMoreRows?: LoadMoreRows;

    /**
     *
     * derive if the cell has loaded or not
     * To be used for displaying a placeholder row.
     *
     */
    hasRowLoaded?: (index: number) => boolean;

    /**
     *
     * get the row id from the component consumer.
     */
    getRowId?: (index: number) => TDataTableRowTruthy | null;

    /**
     *
     * hook toget the row id from the component consumer.
     */
    useGetRowId: (index: number) => TDataTableRowTruthy | null;
}
