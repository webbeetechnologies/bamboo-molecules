import type {
    DataTableProps,
    MenuProps,
    RenderCellProps,
    RenderHeaderCellProps,
} from '../components';
import { useMolecules } from '../hooks';
import { ComponentType, memo, ReactNode, useCallback, useMemo, useRef } from 'react';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { StyleSheet } from 'react-native';

import {
    FieldTypesProvider,
    TableManagerProvider,
    useTableManagerStoreRef,
    HooksContextType,
    HooksProvider,
    useShouldContextMenuDisplayed,
    useTableManagerValueSelector,
} from './contexts';
import { typedMemo } from './hocs';
import { ContextMenu, ColumnHeaderCell, CellRenderer, TableHeaderRow } from './components';
import { useContextMenu, useHandleKeydownEvents } from './hooks';
import type { FieldTypes } from './types';
import { FieldTypes as DefaultFieldTypes } from './field-types';
import PluginsManager from './plugins/plugins-manager';
import type { Plugin } from './types/plugins';

const renderHeader = (props: RenderHeaderCellProps) => <ColumnHeaderCell {...props} />;
const renderCell = (props: RenderCellProps) => <CellRenderer {...props} />;

export type Props = Omit<
    DataTableProps,
    'title' | 'records' | 'renderHeader' | 'renderCell' | 'columns'
> &
    Omit<ViewProps, 'ref'> &
    HooksContextType & {
        onEndReached?: () => void;
        columnIds: string[];
        rowIds: string[];
        fieldTypes?: FieldTypes;
        contextMenuProps?: ContextMenuProps;
        renderHeader?: DataTableProps['renderHeader'];
        renderCell?: DataTableProps['renderCell'];
        plugins?: Plugin[];
    };

export type ContextMenuProps = Partial<MenuProps> & {
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
    verticalScrollProps: _verticalScrollProps,
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

    const verticalScrollProps = useMemo(
        () => ({
            ..._verticalScrollProps,
            CellRendererComponent: RowRendererComponent,
        }),
        [_verticalScrollProps],
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

    useHandleKeydownEvents({ ref });

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
                HeaderRowComponent={TableHeaderRow}
            />

            {shouldContextMenuDisplayed && (
                <ContextMenu isOpen={isOpen} onClose={onClose} {...restContextMenuProps} />
            )}
        </>
    );
};

// TODO - inject this to Provider
const RowRendererComponent = memo(({ style, index, ...rest }: ViewProps & { index: number }) => {
    const { View } = useMolecules();

    const isRowFocused = useTableManagerValueSelector(
        store => store.focusedCell?.rowIndex === index - 1,
    )!;

    const rowRendererStyle = useMemo(
        () => [style, isRowFocused && { zIndex: 100 }],
        [isRowFocused, style],
    );

    return <View style={rowRendererStyle} {...rest} />;
});

const withContextProviders = (Component: ComponentType<Props>) => {
    return ({
        fieldTypes = DefaultFieldTypes as FieldTypes,
        useField,
        useCellValue,
        contextMenuProps,
        plugins,
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
                        <PluginsManager plugins={plugins}>
                            {/* @ts-ignore - we don't want to pass down unnecessary props */}
                            <Component {...rest} contextMenuProps={contextMenuProps} />
                        </PluginsManager>
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
