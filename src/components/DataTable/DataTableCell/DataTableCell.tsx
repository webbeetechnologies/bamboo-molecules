import { FC, memo, useMemo } from 'react';
import { useComponentStyles, useMolecules } from '../../../hooks';
import {
    DataTableCellContext,
    useDataTableColumnWidth,
    useDataTableComponent,
    useDataTableRow,
} from '../DataTableContext/DataTableContext';
import type { DataTableProps, TDataTableColumn, TDataTableRow } from '../types';
import type { TextStyle, ViewProps, ViewStyle } from 'react-native';
import { extractTextStyle } from '../../../utils/extractTextStyles';

export const ColumnComponent: FC<{
    column: TDataTableColumn;
    columnIndex: number;
    row: TDataTableRow;
    rowIndex: number;
    renderCell: DataTableProps['renderCell'];
    width: number;
}> = memo(props => {
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
            {/**
             * TODO: Adopt custom column width
             */}
            <DataTable.Cell width={width}>{cell}</DataTable.Cell>
        </DataTableCellContext.Provider>
    );
});

const Column: FC<{ column: TDataTableColumn; columnIndex: number }> = memo(props => {
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
    return <ColumnComponent {...cellProps} />;
});

export const DataCell: FC<ViewProps & { style?: ViewStyle & TextStyle; width: number }> = memo(
    ({ width, style, ...props }) => {
        const { Text, View } = useMolecules();
        const cellStyles = useComponentStyles('DataTable_Cell', [style, { width }]);

        const [textStyle, viewStyle] = useMemo(() => extractTextStyle(cellStyles), [cellStyles]);
        return (
            <View {...props} style={viewStyle}>
                <Text style={textStyle}>{props.children}</Text>
            </View>
        );
    },
);

export const renderCell = ({ item, index }: { item: TDataTableColumn; index: number }) => (
    <Column column={item} columnIndex={index} />
);
