import { extractInitialState, initialState } from './initialState';
import { useLoadableActionCreator } from './actionCreator';

const loadableDatasource = {
    actionCreator: useLoadableActionCreator,
    extractInitialState,
    initialState,
};

export default loadableDatasource;
