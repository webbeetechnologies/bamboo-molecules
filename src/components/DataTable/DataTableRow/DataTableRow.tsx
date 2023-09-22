import { forwardRef, memo, useMemo } from 'react';
import type { ListRenderItem, ViewStyle } from 'react-native';

import { useActionState, useComponentStyles, useMolecules } from '../../../hooks';
import { shallowCompare } from '../../../utils';
import { renderCellComponent } from '../DataTableCell';
import {
    DataTableCellContextProvider,
    DataTableContextRowProvider,
    useDataTable,
} from '../DataTableContext';
import type { DataTableRowProps, TDataTableRow } from '../types';

// import { useRowWithinBounds } from '../DataTable';

const DataTableRowWrapper = memo((props: DataTableRowProps) => {
    const { rowId, index, rowProps, isSelected = false } = props;

    const { hovered = false, actionsRef } = useActionState();

    const rowSize = useDataTable(store => store.rowSize);

    const rowStyle = useComponentStyles('DataTable_Row', undefined, {
        size: rowProps?.size ?? rowSize,
        states: {
            selected_hovered: isSelected && hovered,
            selected: isSelected,
            hovered,
        },
    });

    const rowContext = useMemo(
        () => ({ row: rowId, rowIndex: index, hovered }),
        [rowId, index, hovered],
    );

    return (
        <DataTableContextRowProvider value={rowContext}>
            <DataTableRowPresentationWithActionState {...props} style={rowStyle} ref={actionsRef} />
        </DataTableContextRowProvider>
    );
});

/**
 *
 * The default DataTable Row component optimized for rendering all sorts of data.
 *
 */
const DataTableRowPresentation = (props: DataTableRowProps & { style?: ViewStyle }, ref: any) => {
    const { rowId, index, columns, rowProps, style } = props;
    const { View, StateLayer } = useMolecules();

    const rowStyle = useComponentStyles('DataTable_Row', [
        rowProps?.style,
        { flexDirection: 'row' },
    ]);

    const result = useMemo(
        () =>
            columns.map((item, i, self) => (
                <DataTableCellContextProvider
                    column={item}
                    columnIndex={i}
                    row={rowId}
                    rowIndex={index}
                    isLast={self.length - 1 === i}
                    key={i}>
                    {renderCellComponent({ item, index: i })}
                </DataTableCellContextProvider>
            )),
        [columns, rowId, index],
    );

    return (
        <View ref={ref} {...rowProps} style={rowStyle}>
            {result}

            <StateLayer style={style} />
        </View>
    );
};

// Add Action State to the row
const DataTableRowPresentationWithActionState = memo(forwardRef(DataTableRowPresentation));
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
    const RowComponent = useRowRenderer?.(props, DataTableRowWrapper) ?? DataTableRowWrapper;

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
