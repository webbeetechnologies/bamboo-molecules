import type { FC, PropsWithChildren } from 'react';
import { memo, useMemo, useRef } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { useMolecules } from '../../../hooks';
import type { DataTableProps, TDataTableColumn } from '../types';
import {
    DataTableCellContext,
    DataTableCellContextType,
    DataTableComponentContext,
    DataTableHeaderCellContext,
    DataTableHeaderCellContextType,
    DataTableProvider,
    deriveColumnWidth,
} from './DataTableContext';

const calculateXOffset = (
    columns: TDataTableColumn[],
    columnWidths: Record<TDataTableColumn, number> | undefined,
    defaultColumnWidth: number,
) =>
    columns.reduce(
        (leftArray, _column, i, self) => {
            if (i === 0) return leftArray;

            const previousColumnWidth = deriveColumnWidth({
                columnWidths,
                column: self[i - 1],
                defaultColumnWidth,
            });

            return [...leftArray, leftArray.at(-1)! + previousColumnWidth];
        },
        [0],
    );

export const DataTableContextProvider: FC<PropsWithChildren<DataTableProps>> = memo(
    ({
        records,
        columns,
        children,
        defaultColumnWidth = 150,
        FlatListComponent: FlatListComponentProp,
        ScrollViewComponent: ScrollViewComponentProp,
        renderCell: renderCellProp,
        renderHeader: renderHeaderProp,
        headerCellProps,
        cellProps,
        headerRowProps,
        rowProps,
        selectedRows,
        rowSize,
        columnWidths,
        useRowRenderer: useRowRendererProp,
        CellWrapperComponent,
        horizontalOffset = 0,
    }) => {
        const { FlatList } = useMolecules();

        const { FlatListComponent, useRowRenderer } = useRef({
            useRowRenderer: useRowRendererProp,
            FlatListComponent:
                FlatListComponentProp ??
                (FlatList as Required<DataTableProps>['FlatListComponent']),
        }).current;

        // TODO: Adopt ScrollView from Molecules.
        const ScrollViewComponent = useRef(ScrollViewComponentProp ?? ScrollView).current;
        const renderCell = useRef(renderCellProp).current;
        const renderHeader = useRef(renderHeaderProp).current;

        const components = useMemo(
            () => ({ FlatListComponent, ScrollViewComponent, renderCell, renderHeader }),
            [FlatListComponent, ScrollViewComponent, renderCell, renderHeader],
        );

        const tableWidth = useMemo(() => {
            return columns.reduce(
                (acc: number, column) => acc + (columnWidths?.[column] ?? defaultColumnWidth),
                horizontalOffset * 2,
            );
        }, [horizontalOffset, columnWidths, columns, defaultColumnWidth]);

        const dataContext = useMemo(
            () => ({
                records,
                columns,
                tableWidth,
                defaultColumnWidth,
                headerCellProps,
                cellProps,
                headerRowProps,
                rowProps,
                selectedRows,
                rowSize,
                horizontalOffset,
                cellXOffsets: calculateXOffset(columns, columnWidths, defaultColumnWidth),
                columnWidths,
                useRowRenderer,
                CellWrapperComponent,
            }),
            [
                CellWrapperComponent,
                records,
                columns,
                tableWidth,
                defaultColumnWidth,
                headerCellProps,
                cellProps,
                headerRowProps,
                rowProps,
                selectedRows,
                rowSize,
                columnWidths,
                horizontalOffset,
                useRowRenderer,
            ],
        );

        return (
            <DataTableComponentContext.Provider value={components}>
                <DataTableProvider value={dataContext}>{children}</DataTableProvider>
            </DataTableComponentContext.Provider>
        );
    },
);

export const DataTableHeaderCellContextProvider = (
    props: PropsWithChildren<DataTableHeaderCellContextType>,
) => {
    const { column, columnIndex, isFirst, isLast } = props;
    const contextValue = useMemo(
        () => ({ column, columnIndex, isFirst, isLast }),
        [column, columnIndex, isFirst, isLast],
    );

    return (
        <DataTableHeaderCellContext.Provider value={contextValue}>
            {props.children}
        </DataTableHeaderCellContext.Provider>
    );
};

export const DataTableCellContextProvider = (
    props: PropsWithChildren<DataTableCellContextType>,
) => {
    const { row, rowIndex, column, columnIndex, isLast } = props;
    const contextValue = useMemo(
        () => ({ row, rowIndex, column, columnIndex, isLast }),
        [row, rowIndex, column, columnIndex, isLast],
    );

    return (
        <DataTableCellContext.Provider value={contextValue}>
            {props.children}
        </DataTableCellContext.Provider>
    );
};
