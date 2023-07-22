import {
    DataTableProps,
    MenuProps,
    RenderCellProps,
    RenderHeaderCellProps,
    useMolecules,
} from '@bambooapp/bamboo-molecules';
import { ComponentType, ReactNode, useCallback, useMemo, useRef } from 'react';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { StyleSheet } from 'react-native';
import { FieldTypes as DefaultFieldTypes } from './field-types';

import {
    FieldTypesProvider,
    TableManagerProvider,
    useTableManagerStoreRef,
    HooksContextType,
    HooksProvider,
    useShouldContextMenuDisplayed,
} from './contexts';
import { typedMemo } from './hocs';
import { ContextMenu, ColumnHeaderCell, CellRenderer } from './components';
import { useContextMenu } from './hooks';
import type { FieldTypes } from './types';

const renderHeader = (props: RenderHeaderCellProps) => <ColumnHeaderCell {...props} />;
const renderCell = (props: RenderCellProps) => <CellRenderer {...props} />;

type Props = Omit<DataTableProps, 'title' | 'records' | 'renderHeader' | 'renderCell' | 'columns'> &
    Omit<ViewProps, 'ref'> &
    HooksContextType & {
        onEndReached?: () => void;
        columnIds: string[];
        rowIds: string[];
        fieldTypes?: FieldTypes;
        contextMenuProps?: ContextMenuProps;
    };

type ContextMenuProps = Partial<MenuProps> & {
    isOpen: boolean;
    handleContextMenuOpen: (payload: {
        type: 'column' | 'cell';
        selection: { columnId?: string; rowId?: string };
    }) => void;
    onClose: () => void;
    children?: ReactNode;
};

const emptyObj = {};

const DataGrid = ({
    verticalScrollProps,
    rowSize: rowHeight = 'sm',
    rowIds,
    columnIds,
    contextMenuProps,
    rowProps: _rowProps,
    cellProps: _cellProps,
    horizontalScrollProps: _horizontalScrollProps,
    ...rest
}: Props) => {
    const { DataTable } = useMolecules();

    const { store } = useTableManagerStoreRef();

    const { handleContextMenuOpen, isOpen, onClose, ...restContextMenuProps } =
        contextMenuProps || (emptyObj as ContextMenuProps);

    const shouldContextMenuDisplayed = useShouldContextMenuDisplayed();

    const ref = useRef(null);

    const cellProps = useMemo(
        () => ({
            ..._cellProps,
            style: [styles.cell, _cellProps?.style],
        }),
        [_cellProps],
    );

    const rowProps = useMemo(
        () => ({
            ..._rowProps,
            style: [styles.row, _rowProps?.style],
        }),
        [_rowProps],
    );

    const horizontalScrollProps = useMemo(
        () => ({
            ..._horizontalScrollProps,
            ...defaultHorizontalScrollProps,

            contentContainerStyle: [
                defaultHorizontalScrollProps.contentContainerStyle,
                _horizontalScrollProps?.contentContainerStyle,
            ],
        }),
        [_horizontalScrollProps],
    );

    const onContextMenuOpen = useCallback(
        (e: any) => {
            e.preventDefault();

            if (!shouldContextMenuDisplayed || !store.current.focusedCell) return;

            const { type, ...focusedCell } = store.current.focusedCell;

            handleContextMenuOpen({ type: type, selection: focusedCell });
        },
        [handleContextMenuOpen, shouldContextMenuDisplayed, store],
    );

    useContextMenu({ ref, callback: onContextMenuOpen });

    return (
        <>
            <DataTable
                ref={ref}
                testID="datagrid"
                renderHeader={renderHeader}
                renderCell={renderCell}
                {...rest}
                columns={columnIds}
                records={rowIds}
                rowSize={rowHeight}
                cellProps={cellProps}
                rowProps={rowProps}
                headerCellProps={cellProps}
                headerRowProps={rowProps}
                verticalScrollProps={verticalScrollProps}
                horizontalScrollProps={horizontalScrollProps}
            />

            {shouldContextMenuDisplayed && (
                <ContextMenu isOpen={isOpen} onClose={onClose} {...restContextMenuProps} />
            )}
        </>
    );
};

const withContextProviders = (Component: ComponentType<Props>) => {
    return ({
        fieldTypes = DefaultFieldTypes as FieldTypes,
        useField,
        useCellValue,
        contextMenuProps,
        ...rest
    }: Props) => {
        const hooksContextValue = useMemo(
            () => ({
                useField,
                useCellValue,
            }),
            [useField, useCellValue],
        );

        return (
            <FieldTypesProvider value={fieldTypes}>
                <HooksProvider value={hooksContextValue}>
                    <TableManagerProvider withContextMenu={!!contextMenuProps}>
                        {/* @ts-ignore - we don't want to pass down unnecessary props */}
                        <Component {...rest} contextMenuProps={contextMenuProps} />
                    </TableManagerProvider>
                </HooksProvider>
            </FieldTypesProvider>
        );
    };
};

const defaultHorizontalScrollProps = { contentContainerStyle: { flexGrow: 1 } };

const styles = StyleSheet.create({
    cell: {
        padding: 0,
        borderBottomWidth: 1,
        borderBottomColor: 'colors.outlineVariant',
    },
    row: {
        padding: 0,
    },
});

export default typedMemo(withContextProviders(DataGrid));
