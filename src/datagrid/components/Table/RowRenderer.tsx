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
import { memo, useMemo } from 'react';

import { useHasGroupedData } from '../../contexts';
import { useCellFocusMethods, useDragAndExtendMethods } from '../../plugins';
import type { DataGridRowRendererProps } from '../../types';

export type Props = DataGridRowRendererProps;

const useBoolean = () => false;
const emptyObj = {};

export const TableRow = memo((props: DataTableRowProps) => {
    const { rowId, index, rowProps, isSelected = false, style } = props;
    const { View } = useMolecules();

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
            <View {...rowProps} style={rowStyle} ref={actionsRef}>
                <TableRowInner {...props} rowId={rowId} />
            </View>
        </DataTableContextRowProvider>
    );
}, areEqual);

const TableRowComponent = memo(({ rowId, index, columns }: Omit<Props, 'rowProps' | 'style'>) => {
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

    return <>{cells}</>;
});

TableRowComponent.displayName = 'DataGridRowRenderer';

const TableRowInner = withRowLoadingPlaceholder(TableRowComponent);
