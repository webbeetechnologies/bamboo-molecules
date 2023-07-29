import { FC, memo, useMemo } from 'react';
import { useComponentStyles, useMolecules, usePrevious } from '../../../hooks';
import {
    DataTableCellContext,
    useDataTable,
    useDataTableCell,
    useDataTableColumnWidth,
    useDataTableComponent,
    useDataTableRow,
} from '../DataTableContext/DataTableContext';
import type { DataTableProps, TDataTableColumn, TDataTableRow, DataCellProps } from '../types';
import { useIsCellWithinBounds } from '../DataTable';

type CellComponentProps = {
    column: TDataTableColumn;
    columnIndex: number;
    row: TDataTableRow;
    rowIndex: number;
    renderCell: DataTableProps['renderCell'];
    width: number;
};

// Used as DataTable.Cell - Can be replaced with Molecules
export const DataCell = memo(({ width, style, ...props }: DataCellProps) => {
    const { View } = useMolecules();

    const { columnIndex, column, row } = useDataTableCell();
    const { cellProps, cellXOffsets } = useDataTable(store => ({
        cellProps: store.cellProps,
        cellXOffsets: store.cellXOffsets,
    }));

    const cellStyles = useComponentStyles('DataTable_Cell', [
        { width },
        { position: 'absolute', left: cellXOffsets[columnIndex] },
        cellProps?.style,
        style,
    ]);

    const isWithinBounds = useIsCellWithinBounds(cellXOffsets[columnIndex], row, column);

    const isVisible = usePrevious(isWithinBounds).current || isWithinBounds;

    if (!isVisible) return <></>;

    return (
        <>
            <View {...cellProps} {...props} style={cellStyles}>
                {props.children}
            </View>
        </>
    );
});

export const CellComponent = memo((props: CellComponentProps) => {
    const { DataTable } = useMolecules();

    const { row, rowIndex, column, columnIndex, renderCell, width } = props;
    const cellContext = useMemo(
        () => ({
            row,
            rowIndex,
            column,
            columnIndex,
        }),
        [row, rowIndex, column, columnIndex],
    );

    const cell = renderCell(cellContext);

    return (
        <DataTableCellContext.Provider value={cellContext}>
            <DataTable.Cell width={width}>{cell}</DataTable.Cell>
        </DataTableCellContext.Provider>
    );
});

const Cell: FC<{ column: TDataTableColumn; columnIndex: number }> = memo(props => {
    const { row, rowIndex } = useDataTableRow();
    const { renderCell } = useDataTableComponent();

    const width = useDataTableColumnWidth(props.column);

    const cellProps = {
        ...props,
        row,
        rowIndex,
        renderCell,
        width,
    };
    return <CellComponent {...cellProps} />;
});

export const renderCellComponent = ({ item, index }: { item: TDataTableColumn; index: number }) => (
    <Cell column={item} columnIndex={index} />
);
