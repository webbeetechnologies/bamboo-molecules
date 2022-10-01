import {ESortDirection, EStoreActions, IDataSource, Records, TFilters, TSort} from "../types";

type FilterAction = { type: EStoreActions.FILTER, payload: TFilters };

type SortAction = { type: EStoreActions.SORT, payload: ESortDirection | TSort };

type RemoveSortAction = { type: EStoreActions.REMOVE_SORT, payload: TSort };

type SetRecordsAction<T> = { type: EStoreActions.SET_RECORDS, payload: Records<T> };

type GoToNext = { type: EStoreActions.GO_TO_NEXT, };
type GoToPrev = { type: EStoreActions.GO_TO_PREV, };
type GoToStart = { type: EStoreActions.GO_TO_START, };
type GoToEnd = { type: EStoreActions.GO_TO_END, };

type PaginateActions = GoToNext | GoToPrev | GoToStart| GoToEnd;

export type ActionInterface<T> = SortAction | FilterAction | SetRecordsAction<T> | RemoveSortAction | PaginateActions;


export type ArrayDataSource<T> = Required<IDataSource<T>> & { pages: Records<T>[], }