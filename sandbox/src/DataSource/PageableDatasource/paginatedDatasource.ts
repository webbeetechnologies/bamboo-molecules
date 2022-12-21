import { actionCreator } from './actionCreator';
import { extractInitialState } from './initialState';

const paginatedDataSource = {
    actionCreator: actionCreator,
    extractInitialState,
};

export default paginatedDataSource;
