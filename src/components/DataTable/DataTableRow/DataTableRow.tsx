import { FC, memo, useMemo } from 'react';
import type { TDataTableColumn, TDataTableRow } from '../types';
import {
    DataTableRowContext,
    useDataTable,
    useDataTableComponent,
} from '../DataTableContext/DataTableContext';
import { renderCell } from '../DataTableCell';
import type { ListRenderItem } from 'react-native';
import { keyExtractor } from '../utils';
import { useComponentStyles } from '../../../hooks';

const Row: FC<{ record: TDataTableRow; index: number }> = memo(props => {
    const { record, index } = props;
    const { FlatListComponent } = useDataTableComponent<TDataTableColumn>();
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

    return (
        <DataTableRowContext.Provider value={rowContext}>
            <FlatListComponent
                horizontal
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                style={rowStyle}
                data={columns}
                renderItem={renderCell}
                keyExtractor={keyExtractor}
            />
        </DataTableRowContext.Provider>
    );
});

export const renderRow: ListRenderItem<TDataTableRow> = ({ item, index }) => (
    <Row record={item} index={index} />
);
