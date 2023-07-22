import type { FC, PropsWithChildren } from 'react';
import { memo, useMemo, useRef } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { useMolecules } from '../../../hooks';
import type { DataTableProps, TDataTableColumn } from '../types';
import { DataTableComponentContext, DataTableProvider } from './DataTableContext';

const calculateXOffset = (
    columns: TDataTableColumn[],
    columnWidths: Record<TDataTableColumn, number> | undefined,
    defaultColumnWidth: number,
) =>
    columns.reduce(
        (leftArray, _column, i) => {
            if (i === 0) return leftArray;

            const previousColumnWidth = columnWidths?.[columns[i - 1]] || defaultColumnWidth;

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
    }) => {
        const { FlatList } = useMolecules();

        const FlatListComponent = useRef(
            FlatListComponentProp ?? (FlatList as Required<DataTableProps>['FlatListComponent']),
        ).current;

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
                (acc, column) => acc + (columnWidths?.[column] ?? defaultColumnWidth),
                0,
            );
        }, [columnWidths, columns, defaultColumnWidth]);
        // const tableHeight = Math.min(records.length * 40);

        const dataContext = useMemo(
            () => ({
                records,
                columns,
                tableWidth,
                // tableHeight,
                defaultColumnWidth,
                headerCellProps,
                cellProps,
                headerRowProps,
                rowProps,
                selectedRows,
                rowSize,
                cellXOffsets: calculateXOffset(columns, columnWidths, defaultColumnWidth),
                columnWidths,
                windowWidth: 0,
            }),
            [
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
            ],
        );

        return (
            <DataTableComponentContext.Provider value={components}>
                <DataTableProvider value={dataContext}>{children}</DataTableProvider>
            </DataTableComponentContext.Provider>
        );
    },
);
