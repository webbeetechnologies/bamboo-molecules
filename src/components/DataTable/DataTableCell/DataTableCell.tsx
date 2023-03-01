import { FC, memo, useMemo } from 'react';
import { useComponentStyles, useMolecules } from '../../../hooks';
import {
    DataTableCellContext,
    useDataTable,
    useDataTableColumnWidth,
    useDataTableComponent,
    useDataTableRow,
} from '../DataTableContext/DataTableContext';
import type { DataTableProps, TDataTableColumn, TDataTableRow } from '../types';
import type { TextStyle, ViewProps, ViewStyle } from 'react-native';
import { extractTextStyle } from '../../../utils/extractTextStyles';

type CellComponentProps = {
    column: TDataTableColumn;
    columnIndex: number;
    row: TDataTableRow;
    rowIndex: number;
    renderCell: DataTableProps['renderCell'];
    width: number;
};
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
            {/**
             * TODO: Adopt custom column width
             */}
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

export const DataCell: FC<ViewProps & { style?: ViewStyle & TextStyle; width: number }> = memo(
    ({ width, style, ...props }) => {
        const { Text, View } = useMolecules();
        const { cellProps } = useDataTable();

        const cellStyles = useComponentStyles('DataTable_Cell', [
            cellProps?.style,
            style,
            { width },
        ]);

        const [textStyle, viewStyle] = useMemo(() => extractTextStyle(cellStyles), [cellStyles]);
        return (
            <View {...cellProps} {...props} style={viewStyle}>
                <Text style={textStyle}>{props.children}</Text>
            </View>
        );
    },
);

export const renderCell = ({ item, index }: { item: TDataTableColumn; index: number }) => (
    <Cell column={item} columnIndex={index} />
);
