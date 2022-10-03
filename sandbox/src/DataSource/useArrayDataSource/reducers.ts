import {createReducer} from "../reducers/createReducer";
import { reduceFilters } from "../reducers/reduceFilters";
import { reduceGoTo, reduceGoToEnd, reduceGoToNext, reduceGoToPrev, reduceGoToStart } from "../reducers/reducePagination";
import { reduceRecords } from "../reducers/reduceRecords";
import { reduceRemoveSort, reduceSort } from "../reducers/reduceSort";
import {EStoreActions} from "../reducers/types";



export const reducer = createReducer({
    [EStoreActions.FILTER]: reduceFilters,
    [EStoreActions.SET_RECORDS]: reduceRecords,
    [EStoreActions.SORT]: reduceSort,
    [EStoreActions.REMOVE_SORT]: reduceRemoveSort,
    [EStoreActions.GO_TO]: reduceGoTo,
    [EStoreActions.GO_TO_START]: reduceGoToStart,
    [EStoreActions.GO_TO_END]: reduceGoToEnd,
    [EStoreActions.GO_TO_NEXT]: reduceGoToNext,
    [EStoreActions.GO_TO_PREV]: reduceGoToPrev,
});