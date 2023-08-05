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
    const { columns, headerRowProps } = useDataTable(store => ({
        columns: store.columns || [],
        headerRowProps: store.headerRowProps,
    }));
    return <DataTableHeaderRowPresentation columns={columns} headerRowProps={headerRowProps} />;
});

export const HeaderCellComponent: FC<RenderHeaderCellProps> = memo(props => {
    const { DataTable } = useMolecules();
    const { renderHeader } = useDataTableComponent();
    const width = useDataTableColumnWidth(props.column);

    if (!width) return null;

    return <DataTable.HeaderCell width={width}>{renderHeader(props)}</DataTable.HeaderCell>;
});

export const renderHeaderCell = ({ item, index }: { item: TDataTableColumn; index: number }) => (
    <HeaderCellComponent column={item} columnIndex={index} />
);

export const DataHeaderCell = memo(({ width, style, ...props }: DataHeaderCellProps) => {
    const { View } = useMolecules();
    const { headerCellProps } = useDataTable(store => ({
        headerCellProps: store.headerCellProps,
    }));
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
