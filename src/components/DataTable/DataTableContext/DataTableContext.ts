import { createContext, MutableRefObject, useContext } from 'react';
import { createFastContext } from '@bambooapp/bamboo-molecules/fast-context';
import type {
    DataTableProps,
    TDataTableColumn,
    TDataTableRow,
    TDataTableRowTruthy,
} from '../types';
import type { VariableSizeList } from '@bambooapp/virtualized-list';
import { registerPortalContext } from '../../../components/Portal';

/**
 *
 * @param value: ContextValue
 * @param message: string
 */
const useInvariant = <T>(value: T, message: string): Exclude<T, null> => {
    if (value === null) {
        throw new Error(message);
    }

    return value as Exclude<T, null>;
};

/**
 *
 * Context for all the data: records and columns.
 * We do not want all the components to update when data changes.
 */

type DataTableContextType = Pick<
    Required<DataTableProps>,
    'records' | 'columns' | 'defaultColumnWidth' | 'getRowId'
> &
    Pick<
        DataTableProps,
        | 'headerCellProps'
        | 'cellProps'
        | 'headerRowProps'
        | 'rowProps'
        | 'selectedRows'
        | 'rowSize'
        | 'useRowRenderer'
        | 'CellWrapperComponent'
        | 'horizontalOffset'
        | 'useGetRowId'
    > & {
        tableWidth: number;
        containerWidth?: number;
        containerHeight?: number;
        contentWidth?: number;
        /*
         * columnIds as keys
         * */
        columnWidths?: Record<TDataTableColumn, number>;
        // tableHeight: number;
        cellXOffsets: number[];
        hasRowLoaded: (index: number) => boolean;
        visibleColumnIndices?: Record<number, boolean>;
        virtualListRef: MutableRefObject<VariableSizeList>;
    };

export const {
    useContext: useDataTableStore,
    useContextValue: useDataTable,
    Provider: DataTableProvider,
    useStoreRef: useDataTableStoreRef,
} = createFastContext<DataTableContextType>(null, true);
/**
 *
 * Context for all the Components: ScrollView, FlatList, renderHeader and renderCell.
 * We do not want all the components to update when data changes.
 */
type DataTableComponentContextType = Pick<
    Required<DataTableProps>,
    'renderHeader' | 'renderCell' | 'ScrollViewComponent'
>;
export const DataTableComponentContext = createContext<DataTableComponentContextType | null>(null);
export const useDataTableComponent = (): DataTableComponentContextType =>
    useInvariant(
        useContext(DataTableComponentContext),
        'Trying to read DataTableComponent context outside the provider',
    );

/**
 * Context to store row data and row level actions
 * also adds event handlers
 */
// TODO: Add event handlers here
type DataTableRowContextType = { row: TDataTableRow; rowIndex: number; hovered: boolean };
export const {
    useContextValue: useDataTableRow,
    useStoreRef: useDataTableRowRef,
    Provider: DataTableContextRowProvider,
} = createFastContext<DataTableRowContextType>({} as DataTableRowContextType, true);

// export const useDataTableRow = () =>
//     useInvariant(
//         useContext(DataTableRowContext),
//         'Trying to read DataTableRow context outside the provider',
//     );

/**
 * Context to store row selections and actions
 * also adds event handlers
 */
// TODO: Add event handlers here
export type DataTableCellContextType = Omit<DataTableRowContextType, 'hovered' | 'row'> & {
    column: TDataTableColumn;
    columnIndex: number;
    isLast: boolean;
    row: TDataTableRowTruthy;
};
export const DataTableCellContext = createContext<DataTableCellContextType | null>(null);
export const useDataTableCell = () =>
    useInvariant(
        useContext(DataTableCellContext),
        'Trying to read DataTableCell context outside the provider',
    );

/**
 * Context to store row selections and actions
 * also adds event handlers
 */

export type DataTableHeaderCellContextType = {
    column: TDataTableColumn;
    columnIndex: number;
    isFirst: boolean;
    isLast: boolean;
};
export const DataTableHeaderCellContext = createContext<DataTableHeaderCellContextType | null>(
    null,
);

registerPortalContext(DataTableCellContext);

export const useDataTableHeaderCell = () =>
    useInvariant(
        useContext(DataTableHeaderCellContext),
        'Trying to read DataTableCell context outside the provider',
    );

export const deriveColumnWidth = ({
    column,
    columnWidths,
    defaultColumnWidth,
}: {
    column: TDataTableColumn;
    columnWidths?: Record<TDataTableColumn, number>;
    defaultColumnWidth: number;
}) => {
    return columnWidths?.[column] ?? defaultColumnWidth;
};

export const useDataTableColumnWidth = (column: TDataTableColumn): number => {
    return useDataTable(({ columnWidths, defaultColumnWidth }) =>
        deriveColumnWidth({ columnWidths, column, defaultColumnWidth }),
    );
};

export const useGetRowId = (index: number) => {
    return useDataTableStoreRef().store.current.useGetRowId(index);
};
