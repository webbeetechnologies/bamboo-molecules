import { createContext, useContext } from 'react';
import type { DataTableProps, TDataTableColumn, TDataTableRow } from '../types';

/**
 *
 * @param value: ContextValue
 * @param message: string
 */
const useInvariant = <T,>(value: T, message: string): Exclude<T, null> => {
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

type DataTableContextType = Omit<
    DataTableProps,
    'renderCell' | 'renderHeader' | 'FlatListComponent'
>;
export const DataTableContext = createContext<DataTableContextType | null>(null);
export const useDataTable = () =>
    useInvariant(
        useContext(DataTableContext),
        'Trying to read DataTable context outside the provider',
    );

/**
 *
 * Context for all the Components: ScrollView, FlatList, renderHeader and renderCell.
 * We do not want all the components to update when data changes.
 */
type DataTableComponentContextType<RecordType = any> = Pick<
    Required<DataTableProps<RecordType>>,
    'renderHeader' | 'renderCell' | 'FlatListComponent' | 'ScrollViewComponent'
>;
export const DataTableComponentContext = createContext<DataTableComponentContextType | null>(null);
export const useDataTableComponent = <
    RecordType extends any,
>(): DataTableComponentContextType<RecordType> =>
    useInvariant(
        useContext(DataTableComponentContext),
        'Trying to read DataTableComponent context outside the provider',
    );

/**
 * Context to store row data and row level actions
 * also adds event handlers
 */
// TODO: Add event handlers here
type DataTableRowContextType = { row: TDataTableRow; rowIndex: number };
export const DataTableRowContext = createContext<DataTableRowContextType | null>(null);
export const useDataTableRow = () =>
    useInvariant(
        useContext(DataTableRowContext),
        'Trying to read DataTableRow context outside the provider',
    );

/**
 * Context to store row selections and actions
 * also adds event handlers
 */
// TODO: Add event handlers here
type DataTableCellContextType = DataTableRowContextType & {
    column: TDataTableColumn;
    columnIndex: number;
};
export const DataTableCellContext = createContext<DataTableCellContextType | null>(null);
export const useDataTableCell = () =>
    useInvariant(
        useContext(DataTableCellContext),
        'Trying to read DataTableCell context outside the provider',
    );
