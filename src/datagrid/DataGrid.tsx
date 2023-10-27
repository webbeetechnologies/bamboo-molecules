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
    LoadMoreRows,
} from '@bambooapp/bamboo-molecules/components';
import { ComponentType, ReactNode, useCallback, useEffect, useMemo, useRef } from 'react';
import { Platform, StyleSheet } from 'react-native';
import {
    getPressedModifierKeys,
    ShortcutsManager,
    useSetScopes,
} from '@bambooapp/bamboo-molecules/shortcuts-manager';

import { useMolecules, usePrevious, useToken } from '../hooks';
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
import type { DataGridLoadMoreRows, FieldTypes } from './types';
import {
    GroupRecord,
    GroupedData,
    addDataToCallbackPairs,
    getRecordByIndex,
    getRecordByIndexNoId,
    getRowIds,
    isDataRow,
} from './utils';
import { useRowRendererDefault } from './components/Table/useRowRendererDefault';
import { isSpaceKey } from '../shortcuts-manager/utils';
import type { TableManagerContextProviderProps } from './contexts/TableManagerContext';

const renderHeader = (props: RenderHeaderCellProps) => <ColumnHeaderCell {...props} />;
const renderCell = (props: RenderCellProps) => <CellRenderer {...props} />;

type DataGridPropsBase = Omit<
    DataTableProps,
    | 'title'
    | 'renderHeader'
    | 'renderCell'
    | 'columns'
    | 'records'
    | 'getRowSize'
    | 'rowCount'
    | 'getRowId'
    | 'hasRowLoaded'
    | 'useGetRowId'
    | 'loadMoreRows'
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

        getRowId: (record: Omit<GroupRecord, 'id'>) => TDataTableRowTruthy | null;
        hasRowLoaded: (record: Omit<GroupRecord, 'id'>) => boolean;
        useGetRowId: TableManagerContextProviderProps['useGetRowId'];
        loadMoreRows?: DataGridLoadMoreRows;
        /**
         * Return a unique timestamp on change, the value would be used to trigger an update.
         */
        useShouldLoadMoreRows: (updatedIndexTuple: [number]) => number;
    };

export type Props = Omit<DataGridPropsBase, 'horizontalOffset'> &
    HooksContextType & {
        fieldTypes?: FieldTypes;
        records: GroupedData[];
        spacerWidth?: string | number;
        focusIgnoredColumns?: TDataTableColumn[];
        getRowSize: (records: GroupedData[], index: number) => number;
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

const useGetRowId = (index: number) => {
    const { store } = useTableManagerStoreRef();
    return store.current.useGetRowId(getRecordByIndex(store.current.records, index))?.id ?? null;
};

const createVisibilityArray = (records: GroupedData[], startIndex: number, stopIndex: number) => {
    if (startIndex > stopIndex) [startIndex, stopIndex] = [stopIndex, startIndex];

    return new Array(stopIndex + 1 - startIndex)
        .fill(null)
        .reduce((rows: GroupRecord[], ...rest) => {
            const record = getRecordByIndexNoId(records, startIndex + rest[1]);
            if (!isDataRow(record)) return rows;
            return [...rows, record];
        }, []);
};

const useLoadMoreRows = (loadMoreRows?: DataGridLoadMoreRows) => {
    const { store } = useTableManagerStoreRef();

    const loadMoreRowsHandled = useCallback<LoadMoreRows>(
        (visibility, forced = false) => {
            store.current.visibleRowsRef.current = visibility;
            loadMoreRows!(
                {
                    ...visibility,
                    visibleGroups: createVisibilityArray(
                        store.current.records,
                        visibility.visibleStartIndex,
                        visibility.visibleStopIndex,
                    ),
                    overscanGroups: createVisibilityArray(
                        store.current.records,
                        visibility.overscanStartIndex,
                        visibility.overscanStopIndex,
                    ),
                    pendingRowGroups: createVisibilityArray(
                        store.current.records,
                        visibility.startIndex,
                        visibility.stopIndex,
                    ),
                },
                forced,
            );
        },
        [loadMoreRows, store],
    );
    return loadMoreRows && loadMoreRowsHandled;
};

const useAutoUpdateRecords = ({
    records,
    flatListRef,
    rowSize,
    loadMoreRows,
    useShouldLoadMoreRows,
}: Pick<Props, 'records' | 'flatListRef' | 'rowSize' | 'useShouldLoadMoreRows'> &
    Pick<DataTableProps, 'loadMoreRows'>) => {
    const defaultEmptyTuple = useRef<[number]>([-1]).current;
    const hasRowSizeUpdated = usePrevious(rowSize).current !== rowSize;
    const { store } = useTableManagerStoreRef();

    const oldRecords = usePrevious(records);

    /**
     *
     * Find the first index that updated.
     * though records update there is a possibility that the first record updated is same index.
     *
     * Making updatedRowIndex return tuple ensures that the useEffect will run always
     */
    const updatedRowIndex = useMemo((): [number] => {
        if (records === oldRecords.current) return defaultEmptyTuple;

        return [records.findIndex((record, index) => oldRecords.current[index] !== record)];
    }, [oldRecords, records, defaultEmptyTuple]);

    /**
     *
     * Reset the row height cache if `updatedRowIndex` or `rowSize` changes
     *
     */
    useEffect(() => {
        if (!hasRowSizeUpdated && updatedRowIndex.at(0) === -1) return;
        flatListRef!.current?.resetAfterIndex((updatedRowIndex as [number]).at(0));
    }, [hasRowSizeUpdated, updatedRowIndex, flatListRef]);

    /**
     *
     * Load more rows when shouldUpdate triggers
     *
     */
    const shouldUpdate = useShouldLoadMoreRows(updatedRowIndex);
    useEffect(() => {
        if (!shouldUpdate) return;
        const visibleRows = store.current.visibleRowsRef.current;

        /**
         *
         * if visibleRows is empty, return
         *
         */
        if (!Object.keys(visibleRows || {}).length) return;

        loadMoreRows?.(visibleRows!, true);
    }, [store, loadMoreRows, shouldUpdate]);
};

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
    loadMoreRows,
    groups: _groups,
    useShouldLoadMoreRows,
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
            ...addDataToCallbackPairs({
                ..._verticalScrollProps,
            }),
        }),
        [_verticalScrollProps],
    );

    const itemSize = useCallback(
        (index: number) => getRowSize(store.current.records as GroupedData[], index),
        [getRowSize, store],
    );

    const handleLoadMoreRows = useLoadMoreRows(loadMoreRows);

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

    useAutoUpdateRecords({
        records: store.current.records,
        flatListRef: store.current.tableFlatListRef,
        loadMoreRows: handleLoadMoreRows,
        useShouldLoadMoreRows,
    });

    return (
        <>
            <DataTable
                ref={store.current.tableRef}
                flatListRef={store.current.tableFlatListRef}
                infiniteLoaderRef={store.current.infiniteLoaderRef}
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
                useGetRowId={useGetRowId}
                loadMoreRows={handleLoadMoreRows}
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
    useGetRowId: useGetRowIdProp,
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
            useGetRowId={useRef(useGetRowIdProp).current}
            getRowId={useCallback(
                index =>
                    getRowId(
                        getRecordByIndex(latestRecordsRef.current, index) as Omit<
                            GroupRecord,
                            'id'
                        >,
                    ),
                [latestRecordsRef, getRowId],
            )}
            hasRowLoaded={useCallback(
                index =>
                    hasRowLoaded(
                        getRecordByIndex(latestRecordsRef.current, index) as Omit<
                            GroupRecord,
                            'id'
                        >,
                    ),
                [latestRecordsRef, hasRowLoaded],
            )}
            withContextMenu={!!contextMenuProps}
            focusIgnoredColumns={focusIgnoredColumns}>
            {/* @ts-ignore - we don't want to pass down unnecessary props */}
            <Component
                {...rest}
                groups={groups}
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
