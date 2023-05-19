import { FC, Fragment, memo, useMemo } from 'react';
import type {
    RenderHeaderCellProps,
    TDataTableColumn,
    DataHeaderCellProps,
    DataTableProps,
} from '../types';
import {
    useDataTable,
    useDataTableColumnWidth,
    useDataTableComponent,
} from '../DataTableContext/DataTableContext';
import { useComponentStyles, useMolecules } from '../../../hooks';

const DataTableHeaderRowPresentation = memo(
    ({ columns, headerRowProps }: Pick<DataTableProps, 'headerRowProps' | 'columns'>) => {
        const { View } = useMolecules();

        const headerStyle = useComponentStyles('DataTable_HeaderRow', [
            headerRowProps?.style,
            {
                flexDirection: 'row',
            },
        ]);
        const result = useMemo(
            () =>
                columns.map((item, i) => (
                    <Fragment key={item}>{renderHeaderCell({ item, index: i })}</Fragment>
                )),
            [columns],
        );

        return (
            <View {...headerRowProps} style={headerStyle}>
                {result}
            </View>
        );
    },
);

export const DataTableHeaderRow = memo(() => {
    const { columns = [], headerRowProps } = useDataTable();
    return <DataTableHeaderRowPresentation columns={columns} headerRowProps={headerRowProps} />;
});

const HeaderCellComponent: FC<RenderHeaderCellProps> = memo(props => {
    const { DataTable } = useMolecules();
    const { renderHeader } = useDataTableComponent();
    const width = useDataTableColumnWidth(props.column);
    // TODO: Adopt custom column width
    return <DataTable.HeaderCell width={width}>{renderHeader(props)}</DataTable.HeaderCell>;
});

const renderHeaderCell = ({ item, index }: { item: TDataTableColumn; index: number }) => (
    <HeaderCellComponent column={item} columnIndex={index} />
);

export const DataHeaderCell = memo(({ width, style, ...props }: DataHeaderCellProps) => {
    const { View } = useMolecules();
    const { headerCellProps } = useDataTable() || {};
    const headerCellStyles = useComponentStyles('DataTable_HeaderCell', [
        { width },
        headerCellProps?.style,
        style,
    ]);

    return (
        <View {...headerCellProps} {...props} style={headerCellStyles}>
            {props.children}
        </View>
    );
});
