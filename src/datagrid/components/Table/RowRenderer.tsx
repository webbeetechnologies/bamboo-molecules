import {
    DataTableRowProps,
    useActionState,
    useComponentStyles,
    useMolecules,
} from '@bambooapp/bamboo-molecules';
import {
    DataTableCellContextProvider,
    DataTableContextRowProvider,
    renderDataTableCellComponent,
    useDataTable,
} from '@bambooapp/bamboo-molecules/components';
import { forwardRef, memo, useMemo } from 'react';
import type { DataGridRowRendererProps } from '../../types';
import type { ViewStyle } from 'react-native';
import { useRecord } from '../../contexts/TableManagerContext';

export type Props = DataGridRowRendererProps;

export const TableRow = memo((props: DataTableRowProps) => {
    const { rowId: id, index, rowProps, isSelected = false } = props;

    const { hovered = false, actionsRef } = useActionState();

    const rowSize = useDataTable(store => store.rowSize);
    const rowId = useRecord(id, record => record.id);

    const rowStyle = useComponentStyles(
        'DataTable_Row',
        [rowProps?.style, { flexDirection: 'row' }],
        {
            size: rowProps?.size ?? rowSize,
            states: {
                selected_hovered: isSelected && hovered,
                selected: isSelected,
                hovered,
            },
        },
    );

    const rowContext = useMemo(
        () => ({ row: rowId, rowIndex: index, hovered }),
        [rowId, index, hovered],
    );

    return (
        <DataTableContextRowProvider value={rowContext}>
            <TableRowInner {...props} rowId={rowId} style={rowStyle} ref={actionsRef} />
        </DataTableContextRowProvider>
    );
});

const TableRowComponent = (
    { rowId, index, columns, rowProps, style }: Props & { style?: ViewStyle },
    ref: any,
) => {
    const { View } = useMolecules();

    const cells = useMemo(
        () =>
            columns.map((item, i, self) => (
                <DataTableCellContextProvider
                    column={item}
                    columnIndex={i}
                    row={rowId}
                    rowIndex={index}
                    isLast={self.length - 1 === i}
                    key={i}>
                    {renderDataTableCellComponent({ item, index: i })}
                </DataTableCellContextProvider>
            )),
        [columns, rowId, index],
    );

    return (
        <View {...rowProps} style={style} ref={ref}>
            {cells}
        </View>
    );
};

const TableRowInner = memo(forwardRef(TableRowComponent));
