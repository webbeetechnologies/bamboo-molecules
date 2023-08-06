import { Fragment, memo, useMemo } from 'react';
import type { ListRenderItem } from 'react-native';

import type { DataTableRowProps, TDataTableRow } from '../types';
import { DataTableRowContext, useDataTable } from '../DataTableContext';
import { renderCellComponent } from '../DataTableCell';
import type { CallbackActionState } from '../../../hocs';
import { useActionState, useComponentStyles, useMolecules } from '../../../hooks';

// import { useRowWithinBounds } from '../DataTable';

/**
 *
 * The default DataTable Row component optimized for rendering all sorts of data.
 *
 */
const DataTableRowPresentation = (props: DataTableRowProps) => {
    const { hovered = false, actionsRef } = useActionState();

    const { rowId, index, columns, rowProps, isSelected = false } = props;
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
                <Fragment key={i}>{renderCellComponent({ item, index: i })}</Fragment>
            )),
        [columns],
    );

    return (
        <DataTableRowContext.Provider value={rowContext}>
            <View ref={actionsRef} {...rowProps} style={rowStyle}>
                {result}
            </View>
        </DataTableRowContext.Provider>
    );
};

// Add Action State to the row
const DataTableRowPresentationWithActionState = memo(DataTableRowPresentation);
DataTableRowPresentation.displayName = 'DataTableRowPresentation';

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
    <DataTableRow rowId={item} index={index} />
);
