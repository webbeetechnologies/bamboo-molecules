import { createDataSource } from './createDataSource';

import filterableDatasource from './FilterableDatasource';
import pageableDatasource from './PageableDatasource';
import sortableDataSource from './SortableDatasource';
import { getDefaultLoadableDataSource } from './LoadableDataSource';
import { FC, memo, PropsWithChildren } from 'react';
import {
    FilterableDataSourceProps,
    FilterableDataSourceResult,
    FilterableDataSourceState,
} from './FilterableDatasource/types';
import {
    SortableDataSourceProps,
    SortableDataSourceResult,
    SortableDataSourceState,
} from './SortableDatasource/types';
import {
    PageableDataSourceProps,
    PaginationDataSourceResult,
    PaginationDataSourceState,
} from './PageableDatasource/types';
import {
    LoadableDataSourceProps,
    LoadableDataSourceResult,
    LoadableDataSourceState,
} from './LoadableDataSource/types';
import { DataSourceReturns, DataSourceType } from './types';
import { DataSourcePresenterType } from './utils';

export type AsyncDataSourceProps<T extends {} = Record<string, any>> = FilterableDataSourceProps &
    SortableDataSourceProps &
    PageableDataSourceProps &
    LoadableDataSourceProps &
    DataSourceType<T>;

export type AsyncDataSourceReturns<T extends {} = Record<string, any>> =
    FilterableDataSourceResult &
        PaginationDataSourceResult<T> &
        SortableDataSourceResult &
        LoadableDataSourceResult &
        DataSourceReturns<T>;

export type AsyncDataSourceState<T extends {} = Record<string, any>> =
    FilterableDataSourceState<T> &
        PaginationDataSourceState<T> &
        SortableDataSourceState<T> &
        LoadableDataSourceState<T>;

const { DataSourceProvider, useDataSourceDispatch, useDataSourceHook } = createDataSource(
    'asyncDataSource',
    [getDefaultLoadableDataSource(), filterableDatasource, sortableDataSource, pageableDatasource],
);

const Provider = DataSourceProvider as FC<PropsWithChildren<AsyncDataSourceProps<any>>>;
export const AsyncDataSourceProvider = memo(
    <T extends {}>(
        props: PropsWithChildren<
            AsyncDataSourceProps<T> & { recordsPresenter?: DataSourcePresenterType<T> }
        >,
    ) => {
        return <Provider {...props} />;
    },
);
export const useAsyncDataSourceDispatch = useDataSourceDispatch;
export const useAsyncDataSourceHook = useDataSourceHook as () => AsyncDataSourceProps;
