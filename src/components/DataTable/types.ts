import type { ComponentPropsWithRef, ComponentType, ReactNode, RefObject } from 'react';
import type {
    FlatListProps,
    ScrollViewProps,
    ViewProps,
    ViewStyle,
    ScrollView,
} from 'react-native';
import type { ViewAbilityConfigPair } from 'src/datagrid/types';
import type { VariableSizeListProps, InfiniteLoaderProps } from '@bambooapp/virtualized-list';

type RowProps = Omit<ViewProps, 'children'> & { size?: string };

export type TDataTableColumn = string | number;

export type TDataTableRowTruthy = string | number;
export type TDataTableRow = TDataTableRowTruthy | undefined;

export interface DataTableComponentProps<T = any> {
    FlatListComponent?: ComponentType<
        Omit<FlatListProps<T>, 'viewabilityConfigCallbackPairs'> & {
            viewabilityConfigCallbackPairs: ViewAbilityConfigPair[];
            ref?: RefObject<any>;
        }
    >;
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
    rowId: TDataTableRow;
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
    flatListRef?: RefObject<any>;
    getRowSize: (index: number) => number;
    rowCount: VariableSizeListProps['itemCount'];
    rowOverscanCount?: VariableSizeListProps['overscanCount'];
    rowKey?: VariableSizeListProps['itemKey'];
    estimatedRowSize?: VariableSizeListProps['estimatedItemSize'];
    onRowsRendered?: VariableSizeListProps['onItemsRendered'];
    rowsLoadingThreshold?: InfiniteLoaderProps['threshold'];
    rowsMinimumBatchSize?: InfiniteLoaderProps['minimumBatchSize'];
    loadMoreRows?: InfiniteLoaderProps['loadMoreItems'];
    isRowLoaded?: InfiniteLoaderProps['isItemLoaded'];
}
