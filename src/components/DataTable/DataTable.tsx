import { forwardRef, memo, useCallback, useMemo, ForwardedRef } from 'react';
import type { DataTableBase, DataTableProps, TDataTableRow } from './types';
import type {
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    ScrollViewProps,
    ViewToken,
} from 'react-native';

import { useComponentStyles } from '../../hooks';
import { createFastContext } from '../../fast-context';
import {
    useDataTable,
    useDataTableColumnWidth,
    useDataTableComponent,
    useDataTableStoreRef,
} from './DataTableContext/DataTableContext';
import { defaultProps } from './defaults';
import { renderRow as renderRowDefault } from './DataTableRow';
import { DataTableContextProvider } from './DataTableContext/DataTableContextProvider';
import { DataTableHeaderRow } from './DataTableHeader';

type DataTableComponentProps = DataTableBase & ScrollViewProps;
type DataTablePresentationProps = DataTableComponentProps &
    Pick<DataTableProps, 'records'> & { tableWidth: number } & Pick<
        Required<DataTableProps>,
        'FlatListComponent' | 'ScrollViewComponent'
    >;
const {
    useStoreRef,
    Provider: HorizontalScrollIndexProvider,
    useContextValue,
} = createFastContext<typeof defaultValue>();

const defaultValue = { x: 0, y: 0, viewItemIds: [] as string[], scrollXVelocity: 0 };
const defaultOffset = 500;

export const useIsCellWithinBounds = (left: number, rowId: string, columnId: string) => {
    const cellWidth = useDataTableColumnWidth(columnId);
    // this is a quick fix // TODO - revisit this later
    const containerWidth = useDataTable(store => store.containerWidth ?? 0);

    const checkLeft = (x: number, offset: number) => left + cellWidth >= x - offset;
    const checkRight = (x: number, offset: number) => left <= x + offset + containerWidth;
    const isViewableItem = (viewItemIds: string[]) => viewItemIds.includes(rowId);

    return useContextValue(
        ({ x, viewItemIds }) =>
            checkLeft(x, isViewableItem(viewItemIds) ? defaultOffset : 0) &&
            checkRight(x, isViewableItem(viewItemIds) ? defaultOffset : 0),
    );
};

const DataTablePresentationComponent = memo(
    forwardRef((props: DataTablePresentationProps, ref: ForwardedRef<ScrollView>) => {
        const {
            verticalScrollProps = {},
            horizontalScrollProps = {},
            style: hStyleProp,
            stickyRowIndices,
            records,
            tableWidth,
            // tableHeight,
            FlatListComponent,
            ScrollViewComponent,
            onLayout: onLayoutProp,
            renderRow: renderRowProp,
            HeaderRowComponent: HeaderRowComponentProp,
            ...restScrollViewProps
        } = props;

        const {
            style: vStyleProp,
            windowSize = defaultProps.windowSize,
            maxToRenderPerBatch = defaultProps.maxToRenderPerBatch,
            keyExtractor: keyExtractorProp = defaultProps.keyExtractor,
            ...vProps
        } = { ...defaultProps, ...verticalScrollProps };

        const hStyle = useComponentStyles('DataTable', [hStyleProp]);
        const vStyle = useMemo(() => [{ width: tableWidth }, vStyleProp], [vStyleProp, tableWidth]);
        const normalizedData = useMemo(() => [{ id: '__header__' }, ...records], [records]);

        const containerWidth = useDataTable(store => store.containerWidth);

        const { store, set: setStore } = useStoreRef();
        const { set: setDataTableStore } = useDataTableStoreRef();

        const renderRow = renderRowProp || renderRowDefault;
        const HeaderRowComponent = HeaderRowComponentProp || DataTableHeaderRow;

        const renderItem: typeof renderRowDefault = useCallback(
            props => {
                return props.index === 0 ? (
                    <HeaderRowComponent key={props.item} />
                ) : (
                    renderRow({ ...props, index: props.index - 1 })
                );
            },
            [HeaderRowComponent, renderRow],
        );

        const stickyHeaderIndices = useMemo(
            () =>
                stickyRowIndices
                    ? Array.from(new Set([0, ...stickyRowIndices.map(x => x + 1)]))
                    : [0],
            [stickyRowIndices],
        );

        const onScroll = useCallback(
            (e: NativeSyntheticEvent<NativeScrollEvent>) => {
                setStore(() => ({
                    x: e.nativeEvent.contentOffset.x,
                    scrollXVelocity: e.nativeEvent.contentOffset.x - store.current.x,
                }));
            },
            [setStore, store],
        );

        const onFlatListScroll = useCallback(
            (e: NativeSyntheticEvent<NativeScrollEvent>) => {
                setStore(() => ({ y: e.nativeEvent.contentOffset.y }));
            },
            [setStore],
        );

        const onViewableItemsChanged = useCallback(
            ({ viewableItems }: { viewableItems: ViewToken[] }) => {
                setStore(() => ({
                    viewItemIds: viewableItems.map(item => item.item),
                }));
            },
            [setStore],
        );

        const onLayout = useCallback(
            (e: LayoutChangeEvent) => {
                onLayoutProp?.(e);

                setDataTableStore(() => ({
                    containerWidth: e.nativeEvent.layout.width,
                }));
            },
            [onLayoutProp, setDataTableStore],
        );

        return (
            <ScrollViewComponent
                {...restScrollViewProps}
                {...horizontalScrollProps}
                onLayout={onLayout}
                onScroll={onScroll}
                scrollEventThrottle={16}
                horizontal={true}
                ref={ref}
                style={hStyle}>
                {!!containerWidth && (
                    <FlatListComponent
                        {...vProps}
                        data={normalizedData}
                        windowSize={windowSize}
                        style={vStyle}
                        maxToRenderPerBatch={maxToRenderPerBatch}
                        keyExtractor={keyExtractorProp}
                        renderItem={renderItem}
                        stickyHeaderIndices={stickyHeaderIndices}
                        onScroll={onFlatListScroll}
                        onViewableItemsChanged={onViewableItemsChanged}
                    />
                )}
            </ScrollViewComponent>
        );
    }),
);

const DataTableComponent = memo(
    forwardRef((props: DataTableComponentProps, ref: ForwardedRef<ScrollView>) => {
        const { records = [], tableWidth } = useDataTable(store => ({
            records: store.records || [],
            tableWidth: store.tableWidth,
        }));
        const { FlatListComponent, ScrollViewComponent } = useDataTableComponent<TDataTableRow>();

        return (
            <DataTablePresentationComponent
                {...props}
                ref={ref}
                records={records}
                tableWidth={tableWidth}
                // tableHeight={tableHeight}
                FlatListComponent={FlatListComponent}
                ScrollViewComponent={ScrollViewComponent}
            />
        );
    }),
);

const withDataTableContext = (Component: typeof DataTableComponent) =>
    memo(
        forwardRef((props: DataTableProps, ref: ForwardedRef<ScrollView>) => {
            const {
                records,
                columns,
                defaultColumnWidth,
                FlatListComponent,
                ScrollViewComponent,
                renderCell,
                renderHeader,
                headerRowProps,
                headerCellProps,
                cellProps,
                rowProps,
                selectedRows,
                rowSize,
                columnWidths,
                ...rest
            } = props;

            const context = {
                records,
                columns,
                defaultColumnWidth,
                FlatListComponent,
                ScrollViewComponent,
                renderCell,
                renderHeader,
                headerRowProps,
                headerCellProps,
                cellProps,
                rowProps,
                selectedRows,
                rowSize,
                columnWidths,
            };

            return (
                <DataTableContextProvider {...context}>
                    <HorizontalScrollIndexProvider value={defaultValue}>
                        <Component {...rest} ref={ref} />
                    </HorizontalScrollIndexProvider>
                </DataTableContextProvider>
            );
        }),
    );

export const DataTable = withDataTableContext(DataTableComponent);
