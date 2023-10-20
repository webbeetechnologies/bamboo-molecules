import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { isMac, typedMemo, useLatest } from '@bambooapp/bamboo-molecules';
import type {
    DataTableProps,
    MenuProps,
    RenderCellProps,
    RenderHeaderCellProps,
    TDataTableColumn,
    TDataTableRow,
    TDataTableRowTruthy,
} from '@bambooapp/bamboo-molecules/components';
import { ComponentType, ReactNode, useCallback, useEffect, useMemo, useRef } from 'react';
import { Platform, StyleSheet } from 'react-native';
import {
    getPressedModifierKeys,
    ShortcutsManager,
    useSetScopes,
} from '@bambooapp/bamboo-molecules/shortcuts-manager';

import { useMolecules, useToken } from '../hooks';
import {
    CellRenderer,
    CellWrapperComponent,
    ColumnHeaderCell,
    ContextMenu,
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
    CELL_FOCUS_PLUGIN_KEY,
    Plugin,
    useCellFocusPlugin,
    useCellSelectionPlugin,
    // TODO: Revisit collapse
    // useExpandCollapseGroupsMethods,
    usePluginsDataStoreRef,
} from './plugins';
import PluginsManager from './plugins/plugins-manager';
import type { FieldTypes } from './types';
import { GroupedData, addDataToCallbackPairs, getRecordByIndexNoId, getRowIds } from './utils';
import { useRowRendererDefault } from './components/Table/useRowRendererDefault';
import { isSpaceKey } from '../shortcuts-manager/utils';

const renderHeader = (props: RenderHeaderCellProps) => <ColumnHeaderCell {...props} />;
const renderCell = (props: RenderCellProps) => <CellRenderer {...props} />;

type DataGridPropsBase = Omit<
    DataTableProps,
    'title' | 'renderHeader' | 'renderCell' | 'columns' | 'records' | 'getRowSize' | 'rowCount'
> &
    Omit<ViewProps, 'ref'> & {
        onEndReached?: () => void;
        columnIds: TDataTableColumn[];
        contextMenuProps?: ContextMenuProps;
        renderHeader?: DataTableProps['renderHeader'];
        renderCell?: DataTableProps['renderCell'];
        plugins?: Plugin[];
        groups?: TDataTableColumn[];
        rowCount?: DataTableProps['rowCount'];
        getRowId: (groupId: string, index: number) => boolean;
    };

export type Props = Omit<DataGridPropsBase, 'horizontalOffset' | 'getRowId' | 'hasRowLoaded'> &
    HooksContextType & {
        fieldTypes?: FieldTypes;
        records: GroupedData[];
        spacerWidth?: string | number;
        focusIgnoredColumns?: TDataTableColumn[];
        getRowSize: (records: GroupedData[], index: number) => number;
        getRowId: (record: Exclude<Omit<GroupedData, 'id'>, undefined>) => TDataTableRowTruthy;
        hasRowLoaded: (record: Exclude<Omit<GroupedData, 'id'>, undefined>) => boolean;
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
    getRowSize: (records: GroupedData[], index: number) => number;
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
    rowCount,
    getRowSize,
    ...rest
}: DataGridPresentationProps) => {
    const { DataTable } = useMolecules();

    const { store } = useTableManagerStoreRef();
    const { store: pluginsDataStore } = usePluginsDataStoreRef();

    const setScopes = useSetScopes();

    const { handleContextMenuOpen, isOpen, onClose, ...restContextMenuProps } =
        contextMenuProps || (emptyObj as ContextMenuProps);

    const shouldContextMenuDisplayed = useShouldContextMenuDisplayed();

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
            ...addDataToCallbackPairs(store, {
                ..._verticalScrollProps,
            }),
        }),
        [store, _verticalScrollProps],
    );

    const itemSize = useCallback(
        (index: number) => getRowSize(store.current.records as GroupedData[], index),
        [getRowSize, store],
    );

    const onContextMenuOpen = useCallback(
        (e: any) => {
            e.preventDefault();

            if (
                !shouldContextMenuDisplayed ||
                !pluginsDataStore.current[CELL_FOCUS_PLUGIN_KEY]?.focusedCell
            )
                return;

            const { type, rowIndex, columnIndex } =
                pluginsDataStore.current[CELL_FOCUS_PLUGIN_KEY]?.focusedCell;
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
        [dataRef, handleContextMenuOpen, pluginsDataStore, shouldContextMenuDisplayed],
    );

    useEffect(() => {
        if (Platform.OS !== 'web') return;

        setScopes([
            {
                name: 'datagrid',
                node: document.querySelector('[data-id="datagrid"]'),
            },
        ]);
    }, [setScopes]);

    // TODO - move this to plugins
    useContextMenu({ ref: store.current.tableRef, callback: onContextMenuOpen });

    return (
        <>
            <DataTable
                ref={store.current.tableRef}
                flatListRef={store.current.tableFlatListRef}
                // @ts-ignore
                dataSet={dataSet}
                testID="datagrid"
                renderHeader={renderHeader}
                renderCell={renderCell}
                {...rest}
                getRowSize={itemSize}
                rowCount={rowCount ?? records.length}
                columns={columnIds}
                records={records}
                rowSize={rowHeight}
                cellProps={cellProps}
                rowProps={rowProps}
                headerCellProps={cellProps}
                headerRowProps={rowProps}
                verticalScrollProps={verticalScrollProps as any}
                horizontalScrollProps={horizontalScrollProps}
                HeaderRowComponent={TableHeaderRow}
                useRowRenderer={useRowRenderer}
                CellWrapperComponent={CellWrapperComponent}
                getRowId={store.current.getRowId}
                hasRowLoaded={store.current.hasRowLoaded}
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
        const cellFocusPlugin = useCellFocusPlugin({});

        const plugins = useMemo(
            () => [selectionPlugin, cellFocusPlugin, ...(_plugins || [])],
            [_plugins, cellFocusPlugin, selectionPlugin],
        );

        const isMacRef = useRef(isMac());
        const shortcuts = useRef([
            {
                name: 'move-cell-focus',
                keys: [
                    'ArrowLeft',
                    'ArrowRight',
                    'ArrowUp',
                    'ArrowDown',
                    'Tab',
                    ['Shift', 'Tab'],
                    isMacRef.current ? ['meta', 'ArrowLeft'] : ['control', 'ArrowLeft'],
                    isMacRef.current ? ['meta', 'ArrowRight'] : ['control', 'ArrowRight'],
                    isMacRef.current ? ['meta', 'ArrowUp'] : ['control', 'ArrowUp'],
                    isMacRef.current ? ['meta', 'ArrowDown'] : ['control', 'ArrowDown'],
                ],
                preventDefault: true,
            },
            {
                name: 'move-cell-selection',
                keys: [
                    ['Shift', 'ArrowLeft'],
                    ['Shift', 'ArrowRight'],
                    ['Shift', 'ArrowUp'],
                    ['Shift', 'ArrowDown'],
                ],
                preventDefault: true,
            },
            {
                name: 'clear-cell-focus',
                keys: ['Escape'],
            },
            {
                name: 'edit-cell',
                keys: ['Enter'],
            },
            {
                name: 'cell-start-editing',
                // doesn't matter what the key is
                keys: ['*'],
                matcher: (e: KeyboardEvent) => {
                    const modifiers = getPressedModifierKeys(e);

                    return (
                        !isSpaceKey(e.key) &&
                        e.key.length === 1 &&
                        (modifiers.includes('shift') ? modifiers.length === 1 : !modifiers.length)
                    );
                },
                preventDefault: true,
            },
        ]).current;

        return (
            <FieldTypesProvider value={fieldTypes}>
                <HooksProvider value={hooksContextValue}>
                    <ShortcutsManager shortcuts={shortcuts}>
                        <PluginsManager plugins={plugins}>
                            <TableManagerProviderWrapper Component={Component} {...rest} />
                        </PluginsManager>
                    </ShortcutsManager>
                </HooksProvider>
            </FieldTypesProvider>
        );
    };
};

const dataSet = { id: 'datagrid' };

// TODO: Revisit collapse
// const defaultExpandCollapseMethods = { useCollapsedGroupIds: () => [] };

const TableManagerProviderWrapper = ({
    records,
    groups,
    contextMenuProps,
    spacerWidth: spacerWidthProp = 'spacings.3',
    Component,
    focusIgnoredColumns,
    getRowId,
    hasRowLoaded,
    ...rest
}: Omit<Props, 'useField' | 'useCellValue'> & {
    Component: ComponentType<DataGridPresentationProps>;
}) => {
    const ref = useRef(null);
    // TODO: Revisit collapse
    // in case expanse collapse plugins in not defined
    // const { useCollapsedGroupIds } =
    //     useExpandCollapseGroupsMethods() || defaultExpandCollapseMethods;

    // const collapsedGroupIds = useCollapsedGroupIds();

    const rowIds = useMemo(() => getRowIds(records), [records]);
    const spacerWidth = useToken(spacerWidthProp as string) ?? spacerWidthProp;

    const offsetWidth = (groups?.length ?? 0) * spacerWidth;
    const latestRecordsRef = useLatest(records);

    return (
        <TableManagerProvider
            tableRef={ref}
            spacerWidth={spacerWidth}
            records={records}
            getRowId={useCallback(
                index => getRowId(getRecordByIndexNoId(latestRecordsRef.current, index)),
                [latestRecordsRef, getRowId],
            )}
            hasRowLoaded={useCallback(
                index => hasRowLoaded(getRecordByIndexNoId(latestRecordsRef.current, index)),
                [latestRecordsRef, hasRowLoaded],
            )}
            withContextMenu={!!contextMenuProps}
            focusIgnoredColumns={focusIgnoredColumns}>
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
