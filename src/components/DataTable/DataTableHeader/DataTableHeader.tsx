import { FC, Fragment, memo, useMemo } from 'react';
import type { DataTableHeaderCellProps, TDataTableColumn } from '../types';
import {
    useDataTable,
    useDataTableColumnWidth,
    useDataTableComponent,
} from '../DataTableContext/DataTableContext';
import type { ViewProps } from 'react-native';
import { useComponentStyles, useMolecules } from '../../../hooks';

export const DataTableHeaderRow: FC = memo(() => {
    const { View } = useMolecules();
    const { columns = [], headerRowProps } = useDataTable() || {};

    const headerStyle = useComponentStyles('DataTable_HeaderRow', [
        headerRowProps?.style,
        {
            flexDirection: 'row',
        },
    ]);
    const result = useMemo(
        () =>
            columns.map((item, i) => (
                <Fragment key={item.id}>{renderHeaderCell({ item, index: i })}</Fragment>
            )),
        [columns],
    );

    return (
        <View {...headerRowProps} style={headerStyle}>
            {result}
        </View>
    );
});

const HeaderCellComponent: FC<DataTableHeaderCellProps> = memo(props => {
    const { DataTable } = useMolecules();
    const { renderHeader } = useDataTableComponent();
    const width = useDataTableColumnWidth(props.column);
    // TODO: Adopt custom column width
    return <DataTable.HeaderCell width={width}>{renderHeader(props)}</DataTable.HeaderCell>;
});

const renderHeaderCell = ({ item, index }: { item: TDataTableColumn; index: number }) => (
    <HeaderCellComponent column={item} columnIndex={index} />
);

export const DataHeaderCell: FC<ViewProps & { width: number }> = memo(
    ({ width, style, ...props }) => {
        const { View } = useMolecules();
        const { headerCellProps } = useDataTable() || {};
        const headerCellStyles = useComponentStyles('DataTable_HeaderCell', [
            headerCellProps?.style,
            style,
            { width },
        ]);

        return (
            <View {...headerCellProps} {...props} style={headerCellStyles}>
                {props.children}
            </View>
        );
    },
);
