import { usePageableActionCreator } from './actionCreator';
import { extractInitialState } from './initialState';

const paginatedDataSource = {
    name: 'paginatedDataSource',
    actionCreator: usePageableActionCreator,
    extractInitialState,
};

export default paginatedDataSource;
