import {ActionInterface, DataSourceState} from "../actions.type";
import {EStoreActions} from "../types";
import {TReduceFilters, reduceFilters as OgReduceFilters} from "./reduceFilters";
import {TReduceRecords, reduceRecords as OgReduceRecords} from "./reduceRecords";
import {TReduceSort, TReduceRemoveSort, reduceSort as OgReduceSort, reduceRemoveSort as OgReduceRemoveSort} from "./reduceSort";
import {
    TReduceGoTo, TReduceGoToEnd, TReduceGoToNext, TReduceGoToPrev, TReduceGoToStart,
    reduceGoTo as OgReduceGoTo, reduceGoToStart as OgReduceGoToStart, reduceGoToEnd as OgReduceGoToEnd,
    reduceGoToPrev as OgReduceGoToPrev, reduceGoToNext as OgReduceGoToNext
} from "./reducePagination";

type ReducerCreatorArgs<T> = {
    reduceFilters?: TReduceFilters<T>,
    reduceRecords?: TReduceRecords<T>,
    reduceSort?: TReduceSort<T>
    reduceRemoveSort?: TReduceRemoveSort<T>,
    reduceGoTo?: TReduceGoTo<T>,
    reduceGoToEnd?: TReduceGoToEnd<T>,
    reduceGoToNext?: TReduceGoToNext<T>,
    reduceGoToPrev?: TReduceGoToPrev<T>,
    reduceGoToStart?: TReduceGoToStart<T>
}

export const createReducer = <T>({
    reduceFilters = OgReduceFilters,
    reduceRecords = OgReduceRecords,
    reduceSort = OgReduceSort,
    reduceRemoveSort = OgReduceRemoveSort,
    reduceGoTo = OgReduceGoTo,
    reduceGoToStart = OgReduceGoToStart,
    reduceGoToEnd = OgReduceGoToEnd,
    reduceGoToNext = OgReduceGoToNext,
    reduceGoToPrev = OgReduceGoToPrev,
  } = {} as ReducerCreatorArgs<T>) => (state: DataSourceState<T>, action: ActionInterface<T>) => {
    switch (action.type) {
        case EStoreActions.FILTER: {
            return reduceFilters(state, action);
        }

        case EStoreActions.SORT: {
            return reduceSort(state, action);
        }

        case EStoreActions.REMOVE_SORT: {
            return reduceRemoveSort(state, action);
        }

        case EStoreActions.SET_RECORDS: {
            return reduceRecords(state, action)
        }

        case EStoreActions.GO_TO: {
            return reduceGoTo(state, action);
        }

        case EStoreActions.GO_TO_START: {
            return reduceGoToStart(state, action)
        }

        case EStoreActions.GO_TO_END: {
            return reduceGoToEnd(state, action)
        }

        case EStoreActions.GO_TO_PREV: {
            return reduceGoToPrev(state, action)
        }

        case EStoreActions.GO_TO_NEXT: {
            return reduceGoToNext(state, action)
        }
    }

    return state;
}