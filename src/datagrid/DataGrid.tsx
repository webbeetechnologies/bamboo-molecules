import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { typedMemo, useLatest } from '@bambooapp/bamboo-molecules';
import type {
    DataTableProps,
    MenuProps,
    RenderCellProps,
    RenderHeaderCellProps,
    TDataTableColumn,
    TDataTableRow,
} from '@bambooapp/bamboo-molecules/components';
import { ComponentType, ReactNode, useCallback, useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';

import { useMolecules, useToken } from '../hooks';
import {
    CellRenderer,
    CellWrapperComponent,
    ColumnHeaderCell,
    ContextMenu,
    RowWrapperComponent,
    TableHeaderRow,
} from './components';
import {
    FieldTypesProvider,
    HooksContextType,
    HooksProvider,
    TableManagerProvider,
    useRowRenderer,
    useShouldContextMenuDisplayed,
    useTableManagerStoreRef,
} from './contexts';
import { FieldTypes as DefaultFieldTypes } from './field-types';
import { useContextMenu } from './hooks';
import {
    Plugin,
    useCellSelectionMethods,
    useCellSelectionPlugin,
    useExpandCollapseGroupsMethods,
} from './plugins';
import PluginsManager from './plugins/plugins-manager';
import type { FieldTypes, ViewAbilityConfigPair } from './types';
import { RecordWithId, addDataToCallbackPairs, prepareGroupedData } from './utils';

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
        verticalScrollProps?: DataTableProps['verticalScrollProps'] & {
            viewabilityConfigCallbackPairs?: ViewAbilityConfigPair[];
        };
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
        () =>
            addDataToCallbackPairs(store, {
                ..._verticalScrollProps,
                CellRendererComponent: RowWrapperComponent,
            }),
        [store, _verticalScrollProps],
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
        plugins: _plugins,
        useRowRenderer: useRowRendererProp = useRowRendererDefault,
        useGroupRowState: useGroupRowStateProp,
        useShowGroupFooter: useShowGroupFooterProp,
        ...rest
    }: Props) => {
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

        return (
            <FieldTypesProvider value={fieldTypes}>
                <HooksProvider value={hooksContextValue}>
                    <PluginsManager plugins={plugins}>
                        <TableManagerProviderWrapper Component={Component} {...rest} />
                    </PluginsManager>
                </HooksProvider>
            </FieldTypesProvider>
        );
    };
};

const defaultExpandCollapseMethods = { useCollapsedGroupIds: () => [] };

const TableManagerProviderWrapper = ({
    records,
    groups,
    contextMenuProps,
    spacerWidth: spacerWidthProp = 'spacings.3',
    Component,
    ...rest
}: Omit<Props, 'useField' | 'useCellValue'> & {
    Component: ComponentType<DataGridPresentationProps>;
}) => {
    const ref = useRef(null);
    // in case expanse collapse plugins in not defined
    const { useCollapsedGroupIds } =
        useExpandCollapseGroupsMethods() || defaultExpandCollapseMethods;
    const collapsedGroupIds = useCollapsedGroupIds();

    const { groupedRecords, rowIds } = useMemo(
        () => prepareGroupedData(records, groups, collapsedGroupIds),
        [records, groups, collapsedGroupIds],
    );
    const spacerWidth = useToken(spacerWidthProp as string) ?? spacerWidthProp;

    const offsetWidth = (groups?.length ?? 0) * spacerWidth;

    return (
        <TableManagerProvider
            tableRef={ref}
            spacerWidth={spacerWidth}
            records={groupedRecords}
            withContextMenu={!!contextMenuProps}>
            {/* @ts-ignore - we don't want to pass down unnecessary props */}
            <Component
                {...rest}
                records={rowIds}
                horizontalOffset={offsetWidth}
                contextMenuProps={contextMenuProps}
            />
        </TableManagerProvider>
    );
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
