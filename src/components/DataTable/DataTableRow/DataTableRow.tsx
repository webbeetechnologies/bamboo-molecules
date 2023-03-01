import { FC, Fragment, memo, useMemo } from 'react';
import type { TDataTableRow } from '../types';
import { DataTableRowContext, useDataTable } from '../DataTableContext/DataTableContext';
import { renderCellComponent } from '../DataTableCell';
import type { ListRenderItem } from 'react-native';
import { useComponentStyles, useMolecules } from '../../../hooks';

export const DataTableRow: FC<{ record: TDataTableRow; index: number }> = memo(props => {
    const { record, index } = props;
    const { View } = useMolecules();
    const { columns = [], rowProps } = useDataTable() || {};

    const rowStyle = useComponentStyles('DataTable_Row', [
        rowProps?.style,
        { flexDirection: 'row' },
        {
            states: {
                disabled: false,
                selected: false,
                hovered: false,
                selected_hovered: false,
            },
        },
    ]);

    const rowContext = useMemo(() => ({ row: record, rowIndex: index }), [record, index]);

    const result = useMemo(
        () =>
            columns.map((item, i) => (
                <Fragment key={item.id}>{renderCellComponent({ item, index: i })}</Fragment>
            )),
        [columns],
    );

    return (
        <DataTableRowContext.Provider value={rowContext} key={record.id}>
            <View {...rowProps} style={rowStyle}>
                {result}
            </View>
        </DataTableRowContext.Provider>
    );
});

export const renderRow: ListRenderItem<TDataTableRow> = ({ item, index }) => (
    <DataTableRow record={item} index={index} key={item.id} />
);
