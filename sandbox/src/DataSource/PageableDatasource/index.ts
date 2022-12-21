import PaginatedDataSource from './paginatedDatasource';
export type { EPageableActions } from './types';
export * from './paginatedDatasource';
export default PaginatedDataSource;

import { paginatedDataSourceReducer } from './reducer';
import { presentPaginatedDataSourceRecords } from './presenter';
import { extractInitialState, initialState } from './initialState';

export { usePageableActionCreator } from './actionCreator';

export {
    presentPaginatedDataSourceRecords,
    paginatedDataSourceReducer,
    extractInitialState as extractInitialPaginationState,
    initialState as initialPaginatedState,
};

export const getDefaultPageableDataSource = () => ({
    ...PaginatedDataSource,
    initialState,
    reducer: paginatedDataSourceReducer,
    presenter: presentPaginatedDataSourceRecords,
});

export { isPaginationAction } from './utils';
