import { FC, memo } from 'react';
import type { DataTableHeaderCellProps, TDataTableColumn } from '../types';
import {
    useDataTable,
    useDataTableColumnWidth,
    useDataTableComponent,
} from '../DataTableContext/DataTableContext';
import type { ListRenderItem, ViewProps } from 'react-native';
import { keyExtractor } from '../utils';
import { useComponentStyles, useMolecules } from '../../../hooks';

export const DataTableHeaderRow: FC = memo(() => {
    const { FlatListComponent } = useDataTableComponent<TDataTableColumn>();
    const { columns = [] } = useDataTable() || {};

    const headerStyle = useComponentStyles('DataTable_HeaderRow', []);

    return (
        <FlatListComponent
            horizontal
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            style={headerStyle}
            data={columns}
            renderItem={renderHeaderCell}
            keyExtractor={keyExtractor}
        />
    );
});

const HeaderCellComponent: FC<DataTableHeaderCellProps> = memo(props => {
    const { DataTable } = useMolecules();
    const { renderHeader } = useDataTableComponent();
    const width = useDataTableColumnWidth(props.column);
    // TODO: Adopt custom column width
    return <DataTable.HeaderCell width={width}>{renderHeader(props)}</DataTable.HeaderCell>;
});

const renderHeaderCell: ListRenderItem<TDataTableColumn> = ({ item, index }) => (
    <HeaderCellComponent column={item} columnIndex={index} />
);

export const DataHeaderCell: FC<ViewProps & { width: number }> = memo(({ width, ...props }) => {
    const { View } = useMolecules();
    const headerCellStyles = useComponentStyles('DataTable_HeaderCell', [{ width }]);

    return <View style={headerCellStyles} {...props} />;
});
