import { Fragment, memo, useMemo } from 'react';
import type { ListRenderItem } from 'react-native';

import type { DataTableRowProps, TDataTableRow } from '../types';
import { DataTableRowContext, useDataTable } from '../DataTableContext';
import { renderCellComponent } from '../DataTableCell';
import { useComponentStyles, useMolecules } from '../../../hooks';
import { CallbackActionState, withActionState } from '../../../hocs';
// import { useRowWithinBounds } from '../DataTable';

/**
 *
 * The default DataTable Row component optimized for rendering all sorts of data.
 *
 */
const DataTableRowPresentation = Object.assign(
    (props: DataTableRowProps & CallbackActionState) => {
        const { rowId, index, hovered = false, columns, rowProps, isSelected = false } = props;
        const { rowSize } = useDataTable(store => ({
            rowSize: store.rowSize,
        }));
        const { View } = useMolecules();

        const rowStyle = useComponentStyles(
            'DataTable_Row',
            [rowProps?.style, { flexDirection: 'row' }],
            {
                size: rowProps?.size ?? rowSize,
                states: {
                    selected_hovered: isSelected && hovered,
                    selected: isSelected,
                    hovered,
                },
            },
        );

        const rowContext = useMemo(
            () => ({ row: rowId, rowIndex: index, hovered }),
            [rowId, index, hovered],
        );

        const result = useMemo(
            () =>
                columns.map((item, i) => (
                    <Fragment key={item}>{renderCellComponent({ item, index: i })}</Fragment>
                )),
            [columns],
        );

        return (
            <DataTableRowContext.Provider value={rowContext} key={rowId}>
                <View {...rowProps} style={rowStyle}>
                    {result}
                </View>
            </DataTableRowContext.Provider>
        );
    },
    {
        displayName: 'DataTableRowPresentation',
    },
);

// Add Action State to the row
const DataTableRowPresentationWithActionState = memo(withActionState(DataTableRowPresentation));

/**
 *
 * Allow component consumer to render a separate row
 * UseCase: Data grid can have header rows, footer rows and data rows.
 */
const DataTableRow = memo(
    (props: Pick<DataTableRowProps, 'rowId' | 'index'> & CallbackActionState) => {
        const { columns, rowProps, isSelected } = useDataTable(store => ({
            columns: store.columns || [],

            rowProps: store.rowProps,
            isSelected: Boolean(store.selectedRows?.[props.rowId]),
        }));

        const useRowRenderer = useDataTable(state => state.useRowRenderer);
        const RowComponent =
            useRowRenderer?.(props, DataTableRowPresentationWithActionState) ??
            DataTableRowPresentationWithActionState;

        return (
            <RowComponent
                {...props}
                columns={columns}
                rowProps={rowProps}
                isSelected={isSelected}
            />
        );
    },
);
DataTableRow.displayName = 'DataTableRow';

/**
 *
 * Used internally by data table for FlatList renderItem
 *
 */
export const renderRow: ListRenderItem<TDataTableRow> = ({ item, index }) => (
    <DataTableRow
        rowId={item}
        index={index}
        key={item}
        actionStateContainerProps={actionStateContainerProps}
    />
);

const actionStateContainerProps = { style: { height: '100%' } };
