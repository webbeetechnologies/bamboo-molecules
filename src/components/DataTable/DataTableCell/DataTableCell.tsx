import { FC, memo, useMemo } from 'react';
import { useComponentStyles, useMolecules } from '../../../hooks';
import {
    useDataTable,
    useDataTableCell,
    useDataTableColumnWidth,
    useDataTableComponent,
    useDataTableRow,
} from '../DataTableContext/DataTableContext';
import { useIsCellWithinBounds } from '../hooks';
import type { DataCellProps, DataTableProps, TDataTableColumn, TDataTableRow } from '../types';

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

    const { columnIndex } = useDataTableCell();
    const { cellProps, cellXOffsets, CellWrapperComponent } = useDataTable(store => ({
        cellProps: store.cellProps,
        cellXOffsets: store.cellXOffsets,
        CellWrapperComponent: store.CellWrapperComponent || View,
    }));

    const cellStyles = useComponentStyles('DataTable_Cell', [
        { width },
        { position: 'absolute', left: cellXOffsets[columnIndex] },
        cellProps?.style,
        style,
    ]);

    const isWithinBounds = useIsCellWithinBounds(columnIndex);

    // const isVisible = usePrevious(isWithinBounds) || isWithinBounds;

    if (!isWithinBounds) return <></>;

    return (
        <>
            <CellWrapperComponent {...cellProps} {...props} style={cellStyles}>
                {props.children}
            </CellWrapperComponent>
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

    return <DataTable.Cell width={width}>{cell}</DataTable.Cell>;
});

const Cell: FC<{ column: TDataTableColumn; columnIndex: number }> = memo(props => {
    const { row, rowIndex } = useDataTableRow(store => ({
        row: store.row,
        rowIndex: store.rowIndex,
    }));
    const { renderCell } = useDataTableComponent();

    const width = useDataTableColumnWidth(props.column);

    if (!width) return null;

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
