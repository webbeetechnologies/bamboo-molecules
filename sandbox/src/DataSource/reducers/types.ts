import {ESortDirection, Records, TFilters, TSort} from "../types";

export enum EStoreActions {
    UN_INITIALIZED,
    SET_RECORDS,
    UPDATE_RECORDS,
    LOAD_INITIAL_RESULTS,
    LOAD_RESULTS_START,
    LOAD_RESULTS_DONE,
    LOAD_RESULTS_ERROR,
    FILTER,
    SORT,
    REMOVE_SORT,
    GO_TO,
    GO_TO_START,
    GO_TO_END,
    GO_TO_NEXT,
    GO_TO_PREV,
    MOVE,
}

interface Action {
    type: EStoreActions,
    payload?: any;
}

// Async Actions
export interface LoadInitialResults extends Action { type: EStoreActions.LOAD_INITIAL_RESULTS, };
export interface StartLoadAction extends Action { type: EStoreActions.LOAD_RESULTS_START, };
export interface CompleteLoadAction extends Action { type: EStoreActions.LOAD_RESULTS_DONE, payload:Records<any> };
export interface ErrorLoadAction extends Action { type: EStoreActions.LOAD_RESULTS_ERROR, };

type AsyncActions = LoadInitialResults | StartLoadAction | CompleteLoadAction | ErrorLoadAction;


// Pagination Actions

export interface GoToNext extends Action { type: EStoreActions.GO_TO_NEXT, };
export interface GoToPrev extends Action { type: EStoreActions.GO_TO_PREV, };
export interface GoToStart extends Action { type: EStoreActions.GO_TO_START, };
export interface GoToEnd extends Action { type: EStoreActions.GO_TO_END, };
export interface GoTo extends Action { type: EStoreActions.GO_TO, payload: { page: number }, };

export type PaginateActions = GoToNext | GoToPrev | GoToStart | GoToEnd | GoTo;



// Filters Action
export interface FilterAction extends Action { type: EStoreActions.FILTER, payload: TFilters };

// Sort Actions
export interface SortAction extends Action { type: EStoreActions.SORT, payload: ESortDirection | TSort };
export interface RemoveSortAction extends Action { type: EStoreActions.REMOVE_SORT, payload: TSort };

type SortActions = SortAction | RemoveSortAction;


// SetRecords Action
export interface SetRecordsAction extends Action { type: EStoreActions.SET_RECORDS, payload: Records<any> };
export interface UpdateRecordsAction extends Action { type: EStoreActions.UPDATE_RECORDS, payload: Records<any> }

type RecordActions = SetRecordsAction | UpdateRecordsAction;

export type ActionInterface = AsyncActions | SortActions | FilterAction | RecordActions | PaginateActions;