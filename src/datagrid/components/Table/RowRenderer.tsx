import { Fragment, memo, useMemo } from 'react';
import { useActionState, useComponentStyles, useMolecules } from '@bambooapp/bamboo-molecules';
import {
    renderDataTableCellComponent,
    DataTableRowContext,
    useDataTable,
} from '@bambooapp/bamboo-molecules/components';
import type { DataGridRowRendererProps } from '../../types';

export type Props = DataGridRowRendererProps;

const TableRowComponent = ({ rowId, index, rowProps }: Props) => {
    const { columns, rowSize, selectedRows } = useDataTable(store => ({
        columns: store.columns || [],
        rowSize: store.rowSize,
        rowProps: store.rowProps,
        selectedRows: store.selectedRows,
    }));
    const { actionsRef, hovered } = useActionState();

    const { View } = useMolecules();

    const isSelected = !!selectedRows && Boolean(selectedRows[rowId]);

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

    const cells = useMemo(
        () =>
            columns.map((item, i) => (
                <Fragment key={item}>{renderDataTableCellComponent({ item, index: i })}</Fragment>
            )),
        [columns],
    );

    return (
        <DataTableRowContext.Provider value={rowContext} key={rowId}>
            <View {...rowProps} style={rowStyle} ref={actionsRef}>
                {cells}
            </View>
        </DataTableRowContext.Provider>
    );
};

export const TableRow = memo(TableRowComponent);
