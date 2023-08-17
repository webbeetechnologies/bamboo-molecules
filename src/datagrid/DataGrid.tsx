import { ComponentType, ReactNode, useCallback, useMemo, useRef } from 'react';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { StyleSheet } from 'react-native';
import { typedMemo, useLatest } from '@bambooapp/bamboo-molecules';
import type {
    TDataTableColumn,
    TDataTableRow,
    DataTableProps,
    MenuProps,
    RenderCellProps,
    RenderHeaderCellProps,
} from '@bambooapp/bamboo-molecules/components';

import { useMolecules, useToken } from '../hooks';
import {
    FieldTypesProvider,
    TableManagerProvider,
    useTableManagerStoreRef,
    HooksContextType,
    HooksProvider,
    useRowRenderer,
    useShouldContextMenuDisplayed,
} from './contexts';
import PluginsManager from './plugins/plugins-manager';
import { useCellSelectionMethods, useCellSelectionPlugin, Plugin } from './plugins';
import {
    ContextMenu,
    ColumnHeaderCell,
    CellRenderer,
    TableHeaderRow,
    CellWrapperComponent,
    RowWrapperComponent,
} from './components';
import { useContextMenu } from './hooks';
import type { FieldTypes } from './types';
import { FieldTypes as DefaultFieldTypes } from './field-types';
import { RecordWithId, prepareGroupedData } from './utils';

import { useRowRendererDefault } from './components/Table/useRowRendererDefault';

const renderHeader = (props: RenderHeaderCellProps) => <ColumnHeaderCell {...props} />;
const renderCell = (props: RenderCellProps) => <CellRenderer {...props} />;

type DataGridPropsBase = Omit<
    DataTableProps,
    'title' | 'renderHeader' | 'renderCell' | 'columns' | 'records'
> &
    Omit<ViewProps, 'ref'> & {
        onEndReached?: () => void;
        columnIds: TDataTableColumn[];
        contextMenuProps?: ContextMenuProps;
        renderHeader?: DataTableProps['renderHeader'];
        renderCell?: DataTableProps['renderCell'];
        plugins?: Plugin[];
        groups?: TDataTableColumn[];
    };

export type Props = Omit<DataGridPropsBase, 'horizontalOffset'> &
    HooksContextType & {
        fieldTypes?: FieldTypes;
        records: RecordWithId[];
        spacerWidth?: string | number;
    };

export type ContextMenuProps = Partial<MenuProps> & {
    isOpen: boolean;
    handleContextMenuOpen: (payload: {
        type: 'column' | 'cell';
        selection: {
            columnId?: TDataTableColumn;
            rowId?: TDataTableRow;
            columnIndex?: number;
            rowIndex?: number;
        };
    }) => void;
    onClose: () => void;
    children?: ReactNode;
};

type DataGridPresentationProps = DataGridPropsBase & {
    records: TDataTableRow[];
};

const emptyObj = {};

const DataGrid = ({
    verticalScrollProps: _verticalScrollProps,
    rowSize: rowHeight = 'sm',
    records,
    columnIds,
    contextMenuProps,
    rowProps: _rowProps,
    cellProps: _cellProps,
    horizontalScrollProps: _horizontalScrollProps,
    ...rest
}: DataGridPresentationProps) => {
    const { DataTable } = useMolecules();

    const { store } = useTableManagerStoreRef();

    const { handleContextMenuOpen, isOpen, onClose, ...restContextMenuProps } =
        contextMenuProps || (emptyObj as ContextMenuProps);

    const shouldContextMenuDisplayed = useShouldContextMenuDisplayed();
    const { useResetSelectionOnClickOutside } = useCellSelectionMethods();

    const dataRef = useLatest<{ records: TDataTableRow[]; columns: TDataTableColumn[] }>({
        records,
        columns: columnIds,
    });

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
            CellRendererComponent: RowWrapperComponent,
        }),
        [_verticalScrollProps],
    );

    const onContextMenuOpen = useCallback(
        (e: any) => {
            e.preventDefault();

            if (!shouldContextMenuDisplayed || !store.current.focusedCell) return;

            const { type, rowIndex, columnIndex } = store.current.focusedCell;
            const rowId = rowIndex !== undefined ? dataRef.current.records[rowIndex] : undefined;
            const columnId =
                columnIndex !== undefined ? dataRef.current.records[columnIndex] : undefined;

            handleContextMenuOpen({
                type: type,
                selection: {
                    rowIndex,
                    rowId,
                    columnId,
                    columnIndex,
                },
            });
        },
        [dataRef, handleContextMenuOpen, shouldContextMenuDisplayed, store],
    );

    // TODO - move this to plugins
    useContextMenu({ ref: store.current.tableRef, callback: onContextMenuOpen });

    useResetSelectionOnClickOutside();

    return (
        <>
            <DataTable
                ref={store.current.tableRef}
                testID="datagrid"
                renderHeader={renderHeader}
                renderCell={renderCell}
                {...rest}
                columns={columnIds}
                records={records}
                rowSize={rowHeight}
                cellProps={cellProps}
                rowProps={rowProps}
                headerCellProps={cellProps}
                headerRowProps={rowProps}
                verticalScrollProps={verticalScrollProps}
                horizontalScrollProps={horizontalScrollProps}
                HeaderRowComponent={TableHeaderRow}
                useRowRenderer={useRowRenderer}
                CellWrapperComponent={CellWrapperComponent}
            />

            {shouldContextMenuDisplayed && (
                <ContextMenu isOpen={isOpen} onClose={onClose} {...restContextMenuProps} />
            )}
        </>
    );
};

const withContextProviders = (Component: ComponentType<DataGridPresentationProps>) => {
    return ({
        fieldTypes = DefaultFieldTypes as FieldTypes,
        useField,
        useCellValue,
        contextMenuProps,
        plugins: _plugins,
        records,
        groups,
        useRowRenderer: useRowRendererProp = useRowRendererDefault,
        useGroupRowState: useGroupRowStateProp,
        useShowGroupFooter: useShowGroupFooterProp,
        spacerWidth: spacerWidthProp = 'spacings.3',
        ...rest
    }: Props) => {
        const ref = useRef(null);

        const spacerWidth = useToken(spacerWidthProp as string) ?? spacerWidthProp;

        const hooksContextValue = useRef({
            useField,
            useCellValue,
            useRowRenderer: useRowRendererProp,
            useGroupRowState: useGroupRowStateProp,
            useShowGroupFooter: useShowGroupFooterProp,
        }).current;

        const selectionPlugin = useCellSelectionPlugin({});

        const plugins = useMemo(
            () => [...(_plugins || []), selectionPlugin],
            [_plugins, selectionPlugin],
        );

        const { groupedRecords, rowIds } = useMemo(
            () => prepareGroupedData(records, groups),
            [records, groups],
        );

        const offsetWidth = (groups?.length ?? 0) * spacerWidth;

        return (
            <FieldTypesProvider value={fieldTypes}>
                <HooksProvider value={hooksContextValue}>
                    <TableManagerProvider
                        tableRef={ref}
                        spacerWidth={spacerWidth}
                        records={groupedRecords}
                        withContextMenu={!!contextMenuProps}>
                        <PluginsManager plugins={plugins}>
                            {/* @ts-ignore - we don't want to pass down unnecessary props */}
                            <Component
                                {...rest}
                                records={rowIds}
                                horizontalOffset={offsetWidth}
                                contextMenuProps={contextMenuProps}
                            />
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
    },
    row: {
        padding: 0,
    },
});

export default typedMemo(withContextProviders(DataGrid));
