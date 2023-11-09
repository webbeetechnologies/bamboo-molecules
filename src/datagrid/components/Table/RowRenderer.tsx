import { forwardRef, memo, useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import {
    DataTableRowProps,
    useActionState,
    useComponentStyles,
    useMolecules,
    withRowLoadingPlaceholder,
} from '@bambooapp/bamboo-molecules';
import {
    DataTableCellContextProvider,
    DataTableContextRowProvider,
    renderDataTableCellComponent,
    useDataTable,
} from '@bambooapp/bamboo-molecules/components';
import { areEqual } from '@bambooapp/virtualized-list';

import type { DataGridRowRendererProps } from '../../types';
import { useCellFocusMethods, useDragAndExtendMethods } from '../../plugins';
import { useHasGroupedData } from '../..';

export type Props = DataGridRowRendererProps;

const useBoolean = () => false;
const emptyObj = {};

export const TableRow = memo((props: DataTableRowProps) => {
    const { rowId, index, rowProps, isSelected = false, style } = props;

    const { hovered = false, actionsRef } = useActionState();

    const rowSize = useDataTable(store => store.rowSize);

    const isGroupsEnabled = useHasGroupedData();

    const { useIsRowFocused } = useCellFocusMethods();
    const { useIsDragHandleVisibleRow = useBoolean } = useDragAndExtendMethods() || emptyObj;

    const isRowFocused = useIsRowFocused(index);
    const isDragHandleVisibleOnRow = useIsDragHandleVisibleRow({ rowIndex: index });

    const rowStyle = useComponentStyles(
        'DataTable_Row',
        [
            rowProps?.style,
            style,
            (isRowFocused || isDragHandleVisibleOnRow) && { zIndex: 9 },
            !isGroupsEnabled && { borderLeftWidth: 0 },
            { flexDirection: 'row' },
        ],
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

    return (
        <DataTableContextRowProvider value={rowContext}>
            <TableRowInner {...props} rowId={rowId} style={rowStyle} ref={actionsRef} />
        </DataTableContextRowProvider>
    );
}, areEqual);

const TableRowComponent = (
    { rowId, index, columns, rowProps, style }: Props & { style?: ViewStyle },
    ref: any,
) => {
    const { View } = useMolecules();

    const cells = useMemo(
        () =>
            columns.map((item, i, self) => (
                <DataTableCellContextProvider
                    column={item}
                    columnIndex={i}
                    row={rowId}
                    rowIndex={index}
                    isLast={self.length - 1 === i}
                    key={i}>
                    {renderDataTableCellComponent({ item, index: i })}
                </DataTableCellContextProvider>
            )),
        [columns, rowId, index],
    );

    return (
        <View {...rowProps} style={style} ref={ref}>
            {cells}
        </View>
    );
};

TableRowComponent.displayName = 'DataGridRowRenderer';

const TableRowInner = withRowLoadingPlaceholder(forwardRef(TableRowComponent));
