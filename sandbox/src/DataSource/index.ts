import PaginatedDataSource from './PageableDatasource';
import SortableDataSource from './SortableDatasource';
import FilterableDatasource from './FilterableDatasource';
import { createDataSource } from './createDataSource';
export * from './createDataSource';
export * from './PageableDatasource';
export * from './SortableDatasource';
export * from './FilterableDatasource';
export * from './LoadableDataSource';

const DataSource = createDataSource([
    FilterableDatasource,
    SortableDataSource,
    PaginatedDataSource,
]);
export const DataSourceProvider = DataSource.DataSourceProvider;
export const useDataSource = DataSource.useDataSourceHook;
export const useDataSourceDispatch = DataSource.useDataSourceDispatch;
