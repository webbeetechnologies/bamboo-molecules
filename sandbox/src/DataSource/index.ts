import PaginatedDataSource from './PageableDatasource';
import SortableDataSource from './SortableDatasource';
import FilterableDatasource from './FilterableDatasource';
import { createDataSource } from './createDataSource';
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
export const DataSourceProvider = DataSource.DataSourceProvider;

export * from './ArrayDataSource';
export * from './AsyncDataSource';
export * from './DataSourceContext';
