import { Fragment, memo, useMemo } from 'react';
import type { DataTableProps, TDataTableRow } from '../types';
import { DataTableRowContext, useDataTable } from '../DataTableContext/DataTableContext';
import { renderCellComponent } from '../DataTableCell';
import type { ListRenderItem } from 'react-native';
import { useComponentStyles, useMolecules } from '../../../hooks';
import { CallbackActionState, withActionState } from '../../../hocs';

type DataTableComponentProps = { record: TDataTableRow; index: number } & CallbackActionState;
const DataTableComponentPresentation = memo(
    (props: DataTableComponentProps & Pick<DataTableProps, 'rowProps' | 'columns'>) => {
        const { record, index, hovered = false } = props;
        const { View } = useMolecules();

        const rowStyle = useComponentStyles(
            'DataTable_Row',
            [props.rowProps?.style, { flexDirection: 'row' }],
            {
                states: {
                    selected_hovered: false,
                    selected: false,
                    hovered,
                },
            },
        );

        const rowContext = useMemo(() => ({ row: record, rowIndex: index }), [record, index]);

        const result = useMemo(
            () =>
                props.columns.map((item, i) => (
                    <Fragment key={item.id}>{renderCellComponent({ item, index: i })}</Fragment>
                )),
            [props.columns],
        );

        return (
            <DataTableRowContext.Provider value={rowContext} key={record.id}>
                <View {...props.rowProps} style={rowStyle}>
                    {result}
                </View>
            </DataTableRowContext.Provider>
        );
    },
);

const DataTableComponent = memo((props: DataTableComponentProps) => {
    const { columns = [], rowProps } = useDataTable();

    return <DataTableComponentPresentation {...props} columns={columns} rowProps={rowProps} />;
});

export const DataTableRow = memo(withActionState(DataTableComponent));

export const renderRow: ListRenderItem<TDataTableRow> = ({ item, index }) => (
    <DataTableRow record={item} index={index} key={item.id} />
);
