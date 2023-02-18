import { FC, Fragment, memo, useMemo } from 'react';
import type { TDataTableColumn, TDataTableRow } from '../types';
import {
    DataTableRowContext,
    useDataTable,
    useDataTableComponent,
} from '../DataTableContext/DataTableContext';
import { renderCell } from '../DataTableCell';
import type { ListRenderItem } from 'react-native';
import { useComponentStyles } from '../../../hooks';

const Row: FC<{ record: TDataTableRow; index: number }> = memo(props => {
    const { record, index } = props;
    const { ScrollViewComponent } = useDataTableComponent<TDataTableColumn>();
    const { columns = [], rowHeight } = useDataTable() || {};

    const rowStyle = useComponentStyles('DataTable_Row', [
        { height: rowHeight },
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
                <Fragment key={item.id}>{renderCell({ item, index: i })}</Fragment>
            )),
        [columns],
    );

    return (
        <DataTableRowContext.Provider value={rowContext} key={record.id}>
            <ScrollViewComponent horizontal showsHorizontalScrollIndicator={false} style={rowStyle}>
                {result}
            </ScrollViewComponent>
        </DataTableRowContext.Provider>
    );
});

export const renderRow: ListRenderItem<TDataTableRow> = ({ item, index }) => (
    <Row record={item} index={index} key={item.id} />
);
