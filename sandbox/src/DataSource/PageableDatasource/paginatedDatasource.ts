import { createDataSource } from '../createDataSource';
import { actionCreator } from './actionCreator';
import { extractInitialState } from './initialState';

const paginatedDataSource = {
    actionCreator: actionCreator,
    extractInitialState,
};

const { DataSourceProvider, useDataSourceHook, useDataSourceDispatch } = createDataSource([
    paginatedDataSource,
]);

export default paginatedDataSource;
export const PaginatedDataSourceProvider = DataSourceProvider;
export const usePaginatedDataSource = useDataSourceHook;
export const usePaginatedDispatch = useDataSourceDispatch;
