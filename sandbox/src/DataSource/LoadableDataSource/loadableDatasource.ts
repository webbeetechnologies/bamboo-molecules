import { createDataSource } from '../createDataSource';
import { extractInitialState, initialState } from './initialState';
import { useLoadableActionCreator } from './actionCreator';

const loadableDatasource = {
    actionCreator: useLoadableActionCreator,
    extractInitialState: extractInitialState,
    initialState,
};

const { DataSourceProvider, useDataSourceHook, useDataSourceDispatch } = createDataSource([
    loadableDatasource,
]);

export default loadableDatasource;
export const LoadableDataSourceProvider = DataSourceProvider;
export const loadableDataSource = useDataSourceHook;
export const useLoadableDispatch = useDataSourceDispatch;
