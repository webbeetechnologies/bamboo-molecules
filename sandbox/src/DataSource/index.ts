import PaginatedDataSource from './PageableDatasource';
import SortableDataSource from './SortableDatasource';
import FilterableDatasource from './FilterableDatasource';
import { createDataSource } from './createDataSource';
import { FC, PropsWithChildren } from 'react';
import { FilterableDataSourceResult } from './FilterableDatasource/types';
import { SortableDataSourceResult } from './SortableDatasource/types';
import { PaginationDataSourceResult } from './PageableDatasource/types';
export * from './createDataSource';
export * from './PageableDatasource';
export * from './SortableDatasource';
export * from './FilterableDatasource';
export * from './LoadableDataSource';

export * from './utils';

const DataSource = createDataSource('BasicDataSource', [
    FilterableDatasource,
    SortableDataSource,
    PaginatedDataSource,
]);

export const DataSourceProvider = DataSource.DataSourceProvider as unknown as FC<
    PropsWithChildren<
        FilterableDataSourceResult &
            SortableDataSourceResult &
            PaginationDataSourceResult<Record<string, any>>
    >
>;

export * from './ArrayDataSource';
export * from './AsyncDataSource';
export * from './DataSourceContext';
