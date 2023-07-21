import { Fragment, memo, useMemo } from 'react';
import type { DataTableProps, TDataTableRow } from '../types';
import { DataTableRowContext, useDataTable } from '../DataTableContext/DataTableContext';
import { renderCellComponent } from '../DataTableCell';
import type { ListRenderItem } from 'react-native';
import { useComponentStyles, useMolecules } from '../../../hooks';
import { CallbackActionState, withActionState } from '../../../hocs';
// import { useRowWithinBounds } from '../DataTable';

type DataTableComponentProps = { record: TDataTableRow; index: number };
const DataTableComponentPresentation = memo(
    (
        props: DataTableComponentProps &
            CallbackActionState &
            Pick<DataTableProps, 'rowSize' | 'rowProps' | 'columns'> & { isSelected: boolean },
    ) => {
        const { record, index, isSelected, hovered = false, rowSize } = props;
        const { View } = useMolecules();

        const rowStyle = useComponentStyles(
            'DataTable_Row',
            [props.rowProps?.style, { flexDirection: 'row' }],
            {
                size: props.rowProps?.size ?? rowSize,
                states: {
                    selected_hovered: isSelected && hovered,
                    selected: isSelected,
                    hovered,
                },
            },
        );

        const rowContext = useMemo(() => ({ row: record, rowIndex: index }), [record, index]);

        const result = useMemo(
            () =>
                props.columns.map((item, i) => (
                    <Fragment key={item}>{renderCellComponent({ item, index: i })}</Fragment>
                )),
            [props.columns],
        );

        return (
            <DataTableRowContext.Provider value={rowContext} key={record}>
                <View {...props.rowProps} style={rowStyle}>
                    {result}
                </View>
            </DataTableRowContext.Provider>
        );
    },
);

const DataTableComponent = memo((props: DataTableComponentProps) => {
    const { columns = [], rowSize, rowProps, selectedRows } = useDataTable();
    //
    // const { cellYOffsets } = useDataTable();
    // const isRowWithinBounds = useRowWithinBounds(cellYOffsets[props.index]);
    //
    // if (!isRowWithinBounds) return null;

    return (
        <DataTableComponentPresentation
            isSelected={!!selectedRows && Boolean(selectedRows[props.record])}
            {...props}
            columns={columns}
            rowProps={rowProps}
            // rowProps={{
            //     ...rowProps,
            //     style: {
            //         position: 'absolute',
            //         top: cellYOffsets[props.index],
            //         height: 40,
            //         width: '100%',
            //     },
            // }}
            rowSize={rowSize}
        />
    );
});

// @ts-ignore // TODO - fix ts issue @elvisduru
export const DataTableRow = memo(withActionState(DataTableComponent));

export const renderRow: ListRenderItem<TDataTableRow> = ({ item, index }) => (
    // @ts-ignore // TODO - fix ts issue @elvisduru
    <DataTableRow record={item} index={index} key={item} />
);
