import LoadableDataSource from './loadableDatasource';
import { extractInitialState, initialState } from './initialState';

import { loadableDataSourceReducer } from './reducer';
export type { ELoadableActions } from './types';

export * from './loadableDatasource';
export default LoadableDataSource;
export { useLoadableActionCreator, useLoadableDataSource } from './actionCreator';
export { isLoadableAction } from './utils';

export {
    extractInitialState as extractInitialLoadableState,
    initialState as initialLoadableState,
    loadableDataSourceReducer,
};

export const getDefaultLoadableDataSource = () => ({
    ...LoadableDataSource,
    initialState,
    reducer: loadableDataSourceReducer,
});
