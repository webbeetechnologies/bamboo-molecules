import { useSortableActionCreator } from './actionCreator';
import { extractInitialState } from './initialState';

const sortableDataSource = {
    actionCreator: useSortableActionCreator,
    extractInitialState,
};

export default sortableDataSource;
