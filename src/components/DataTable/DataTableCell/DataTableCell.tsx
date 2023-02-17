import { FC, memo, useMemo } from 'react';
import { useComponentStyles, useMolecules } from '../../../hooks';
import {
    DataTableCellContext,
    useDataTableComponent,
    useDataTableRow,
} from '../DataTableContext/DataTableContext';
import type { DataTableProps, TDataTableColumn, TDataTableRow } from '../types';
import type { ListRenderItem, ViewProps } from 'react-native';

export const ColumnComponent: FC<{
    column: TDataTableColumn;
    columnIndex: number;
    row: TDataTableRow;
    rowIndex: number;
    renderCell: DataTableProps['renderCell'];
}> = memo(props => {
    const { DataTable } = useMolecules();

    const { row, rowIndex, column, columnIndex, renderCell } = props;
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
            {/**
             * TODO: Adopt custom column width
             */}
            <DataTable.Cell width={200}>{cell}</DataTable.Cell>
        </DataTableCellContext.Provider>
    );
});

const Column: FC<{ column: TDataTableColumn; columnIndex: number }> = memo(props => {
    const { row, rowIndex } = useDataTableRow();
    const { renderCell } = useDataTableComponent();

    const cellProps = {
        ...props,
        row,
        rowIndex,
        renderCell,
    };
    return <ColumnComponent {...cellProps} />;
});

export const DataCell: FC<ViewProps & { width: number }> = memo(({ width = 200, ...props }) => {
    const { View } = useMolecules();
    const cellStyles = useComponentStyles('DataTable_Cell', [{ width }]);
    return <View {...props} style={cellStyles} />;
});

export const renderCell: ListRenderItem<TDataTableColumn> = ({ item, index }) => (
    <Column column={item} columnIndex={index} />
);
