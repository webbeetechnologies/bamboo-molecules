import {ESortDirection, EStoreActions, IDataSource, Records, TFilters, TSort} from "./types";

export type FilterAction = { type: EStoreActions.FILTER, payload: TFilters };

export type SortAction = { type: EStoreActions.SORT, payload: ESortDirection | TSort };

export type RemoveSortAction = { type: EStoreActions.REMOVE_SORT, payload: TSort };

export type SetRecordsAction<T> = { type: EStoreActions.SET_RECORDS, payload: Records<T> };

export type GoToNext = { type: EStoreActions.GO_TO_NEXT, };
export type GoToPrev = { type: EStoreActions.GO_TO_PREV, };
export type GoToStart = { type: EStoreActions.GO_TO_START, };
export type GoToEnd = { type: EStoreActions.GO_TO_END, };
export type GoTo = { type: EStoreActions.GO_TO, payload: { page: number }, };

export type PaginateActions = GoToNext | GoToPrev | GoToStart | GoToEnd | GoTo;

export type ActionInterface<T> = SortAction | FilterAction | SetRecordsAction<T> | RemoveSortAction | PaginateActions;

export type DataSourceState<T> = IDataSource<T> & { pages?: Records<T>[], action?: EStoreActions, originalRecords?: Records<T>, records: Records<T> }
export type ArrayDataSource<T> = Required<IDataSource<T>>