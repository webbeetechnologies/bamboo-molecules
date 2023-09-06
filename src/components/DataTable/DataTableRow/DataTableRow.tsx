import { Fragment, memo, useMemo } from 'react';
import type { ListRenderItem } from 'react-native';

import { useActionState, useComponentStyles, useMolecules } from '../../../hooks';
import { shallowCompare } from '../../../utils';
import { renderCellComponent } from '../DataTableCell';
import { DataTableCellContext, DataTableRowContext, useDataTable } from '../DataTableContext';
import type { DataTableRowProps, TDataTableRow } from '../types';

// import { useRowWithinBounds } from '../DataTable';

/**
 *
 * The default DataTable Row component optimized for rendering all sorts of data.
 *
 */
const DataTableRowPresentation = (props: DataTableRowProps) => {
    const rowSize = useDataTable(store => store.rowSize);
    const { hovered = false, actionsRef } = useActionState();

    const { rowId, index, columns, rowProps, isSelected = false } = props;
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
            columns.map((item, i, self) => (
                <DataTableCellContext.Provider
                    value={{
                        column: item,
                        columnIndex: i,
                        row: rowId,
                        rowIndex: index,
                        isLast: self.length - 1 === i,
                    }}>
                    <Fragment key={i}>{renderCellComponent({ item, index: i })}</Fragment>
                </DataTableCellContext.Provider>
            )),
        [columns, rowId, index],
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
const DataTableRow = memo(({ index }: Pick<DataTableRowProps, 'index'>) => {
    const { columns, rowProps, isSelected, rowId } = useDataTable(store => {
        const recordId = store.records[index];
        return {
            rowId: recordId,
            columns: store.columns || [],
            rowProps: store.rowProps,
            isSelected: Boolean(store.selectedRows?.[recordId]),
        };
    }, shallowCompare);

    const props = {
        rowId,
        index,
    };

    const useRowRenderer = useDataTable(state => state.useRowRenderer);
    const RowComponent =
        useRowRenderer?.(props, DataTableRowPresentationWithActionState) ??
        DataTableRowPresentationWithActionState;

    return (
        <RowComponent {...props} columns={columns} rowProps={rowProps} isSelected={isSelected} />
    );
});
DataTableRow.displayName = 'DataTableRow';

/**
 *
 * Used internally by data table for FlatList renderItem
 *
 */
export const renderRow: ListRenderItem<TDataTableRow> = ({ index }) => {
    return <DataTableRow index={index} />;
};
