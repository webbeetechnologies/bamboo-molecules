import { FC, Fragment, memo, useMemo } from 'react';
import type { DataTableHeaderCellProps, TDataTableColumn } from '../types';
import {
    useDataTable,
    useDataTableColumnWidth,
    useDataTableComponent,
} from '../DataTableContext/DataTableContext';
import type { ViewProps } from 'react-native';
import { useComponentStyles, useMolecules } from '../../../hooks';
import { extractTextStyle } from '../../../utils/extractTextStyles';
import type { TextStyle, ViewStyle } from 'react-native';

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

export const DataHeaderCell: FC<ViewProps & { style?: ViewStyle & TextStyle; width: number }> =
    memo(({ width, style, ...props }) => {
        const { View, Text } = useMolecules();
        const { headerCellProps } = useDataTable() || {};
        const headerCellStyles = useComponentStyles('DataTable_HeaderCell', [
            headerCellProps?.style,
            style,
            { width },
        ]);

        const [textStyle, viewStyle] = useMemo(
            () => extractTextStyle(headerCellStyles),
            [headerCellStyles],
        );

        return (
            <View {...headerCellProps} {...props} style={viewStyle}>
                <Text style={textStyle}>{props.children}</Text>
            </View>
        );
    });
