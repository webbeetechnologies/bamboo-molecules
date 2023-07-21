import { forwardRef, memo, useCallback, useMemo, ForwardedRef } from 'react';
import type { DataTableBase, DataTableProps, TDataTableRow } from './types';
import type {
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    ScrollViewProps,
    ViewToken,
} from 'react-native';
import { useComponentStyles } from '../../hooks';
import {
    useDataTable,
    useDataTableColumnWidth,
    useDataTableComponent,
} from './DataTableContext/DataTableContext';
import { defaultProps } from './defaults';
import { renderRow } from './DataTableRow';
import { DataTableContextProvider } from './DataTableContext/DataTableContextProvider';
import { DataTableHeaderRow } from './DataTableHeader';
import { createFastContext } from '@bambooapp/bamboo-molecules/fast-context';

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

export const useIsCellWithinBounds = (left: number, id: string) => {
    const cellWidth = useDataTableColumnWidth(`_name-${1}`);

    const checkLeft = (x: number, offset: number) => left + cellWidth >= x - offset;
    const checkRight = (x: number, offset: number) => left <= x + offset + 500;
    const isViewableItem = (viewItemIds: string[]) => viewItemIds.includes(id);

    return useContextValue(
        ({ x, viewItemIds }) =>
            checkLeft(x, isViewableItem(viewItemIds) ? 500 : 0) &&
            checkRight(x, isViewableItem(viewItemIds) ? 500 : 0),
    );
};

export const useRowWithinBounds = (top: number) => {
    const checkTop = useCallback((y: number, offset: number) => top + 40 >= y - offset, [top]);
    const checkBottom = useCallback((y: number, offset: number) => top <= y + offset + 500, [top]);

    return useContextValue(({ y }) => checkTop(y, 500) && checkBottom(y, 500));
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

        const { store, set: setStore } = useStoreRef();

        const renderItem: typeof renderRow = useCallback(props => {
            return props.index === 0 ? (
                <DataTableHeaderRow key={props.item} />
            ) : (
                renderRow({ ...props, index: props.index - 1 })
            );
        }, []);

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

        return (
            <ScrollViewComponent
                {...restScrollViewProps}
                {...horizontalScrollProps}
                onScroll={onScroll}
                scrollEventThrottle={16}
                horizontal={true}
                ref={ref}
                style={hStyle}>
                {/*<ScrollViewComponent*/}
                {/*    scrollEventThrottle={16}*/}
                {/*    horizontal={false}*/}
                {/*    onScroll={onFlatListScroll}>*/}
                {/*    {normalizedData.map((item, index) => renderItem({ index, item }))}*/}
                {/*</ScrollViewComponent>*/}

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
            </ScrollViewComponent>
        );
    }),
);

const DataTableComponent = memo(
    forwardRef((props: DataTableComponentProps, ref: ForwardedRef<ScrollView>) => {
        const { records = [], tableWidth } = useDataTable() || {};
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
