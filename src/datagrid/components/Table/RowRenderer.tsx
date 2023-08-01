import { Fragment, memo, useMemo } from 'react';
import type { ListRenderItem } from 'react-native';
import {
    useComponentStyles,
    useMolecules,
    CallbackActionState,
    withActionState,
} from '@bambooapp/bamboo-molecules';
import {
    renderDataTableCellComponent,
    DataTableRowContext,
    useDataTable,
} from '@bambooapp/bamboo-molecules/components';

export type Props = CallbackActionState & { record: string; index: number };

const TableRowComponent = ({ record, index, hovered = false }: Props) => {
    const { columns, rowSize, rowProps, selectedRows } = useDataTable(store => ({
        columns: store.columns || [],
        rowSize: store.rowSize,
        rowProps: store.rowProps,
        selectedRows: store.selectedRows,
    }));

    const { View } = useMolecules();

    const isSelected = !!selectedRows && Boolean(selectedRows[record]);

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
        () => ({ row: record, rowIndex: index, hovered }),
        [record, index, hovered],
    );

    const cells = useMemo(
        () =>
            columns.map((item, i) => (
                <Fragment key={item}>{renderDataTableCellComponent({ item, index: i })}</Fragment>
            )),
        [columns],
    );

    return (
        <DataTableRowContext.Provider value={rowContext} key={record}>
            <View {...rowProps} style={rowStyle}>
                {cells}
            </View>
        </DataTableRowContext.Provider>
    );
};

export const TableRow = memo(withActionState(TableRowComponent));

export const renderRow: ListRenderItem<string> = ({ item, index }) => (
    <TableRow
        record={item}
        index={index}
        key={item}
        actionStateContainerProps={actionStateContainerProps}
    />
);

const actionStateContainerProps = { style: { height: '100%' } };
