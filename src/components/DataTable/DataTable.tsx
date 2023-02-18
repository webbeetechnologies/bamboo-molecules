import type { FC, ForwardedRef } from 'react';
import { forwardRef, memo, useCallback, useMemo } from 'react';
import type { DataTableProps, ScrollProps, TDataTableRow } from './types';
import { DataTableContextProvider } from './DataTableContext/DataTableContextProvider';
import { useDataTable, useDataTableComponent } from './DataTableContext/DataTableContext';
import { renderRow } from './DataTableRow';
import { DataTableHeaderRow } from './DataTableHeader';
import { defaultProps } from './defaults';
import type { ScrollView } from 'react-native';
import { useComponentStyles } from '../../hooks';

const DataTableComponent = memo(
    forwardRef(
        (
            { verticalScrollProps = {}, horizontalScrollProps = {} }: ScrollProps,
            ref: ForwardedRef<ScrollView>,
        ) => {
            const { FlatListComponent, ScrollViewComponent } =
                useDataTableComponent<TDataTableRow>();
            const { records = [], tableWidth } = useDataTable() || {};
            const styles = useComponentStyles('DataTable');

            const {
                style: vStyle,
                windowSize = defaultProps.windowSize,
                maxToRenderPerBatch = defaultProps.maxToRenderPerBatch,
                keyExtractor: keyExtractorProp = defaultProps.keyExtractor,
                ...vProps
            } = verticalScrollProps;

            const style = useMemo(() => [vStyle, { width: tableWidth }], [vStyle, tableWidth]);
            const normalizedData = useMemo(() => [{ id: '__header__' }, ...records], [records]);

            const renderItem: typeof renderRow = useCallback(props => {
                return props.index === 0 ? (
                    <DataTableHeaderRow key={props.item.id} />
                ) : (
                    renderRow({ ...props, index: props.index - 1 })
                );
            }, []);

            const stickyHeaderIndices = useMemo(() => [0], []);

            return (
                <ScrollViewComponent
                    {...horizontalScrollProps}
                    horizontal={true}
                    ref={ref}
                    style={styles}>
                    <FlatListComponent
                        {...vProps}
                        data={normalizedData}
                        windowSize={windowSize}
                        style={style}
                        maxToRenderPerBatch={maxToRenderPerBatch}
                        keyExtractor={keyExtractorProp}
                        renderItem={renderItem}
                        stickyHeaderIndices={stickyHeaderIndices}
                    />
                </ScrollViewComponent>
            );
        },
    ),
);

const withDataTableContext = (Component: typeof DataTableComponent): FC<DataTableProps> =>
    memo(
        forwardRef((props, ref: ForwardedRef<ScrollView>) => {
            const {
                records,
                columns,
                defaultColumnWidth,
                FlatListComponent,
                ScrollViewComponent,
                renderCell,
                renderHeader,
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
            };

            return (
                <DataTableContextProvider {...context}>
                    <Component {...rest} ref={ref} />
                </DataTableContextProvider>
            );
        }),
    );

export const DataTable = withDataTableContext(DataTableComponent);
