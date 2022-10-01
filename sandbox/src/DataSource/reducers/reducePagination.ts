import {DataSourceState, GoTo, GoToEnd, GoToNext, GoToPrev, GoToStart} from "../actions.type";

export type TReduceGoTo<T> = typeof reduceGoTo;

export function reduceGoTo<T>(state: DataSourceState<T>, action: GoTo) {
    if (!state.pagination) throw new Error("Data Source is not paginated");

    return {
        ...state,
        action: action.type,
        pagination: {
            ...state.pagination,
            page: Math.min(Math.max(1, action.payload.page), (state.originalRecords ?? state.records).length)
        },
    }
}


export type TReduceGoToEnd<T> = typeof reduceGoToEnd;

export function reduceGoToEnd<T>(state: DataSourceState<T>, action: GoToEnd) {
    if (!state.pagination) throw new Error("Data Source is not paginated");

    return {
        ...state,
        action: action.type,
        pagination: {
            ...state.pagination,
            page: state.pages?.length,
        },
    }
}

export type TReduceGoToStart<T> = typeof reduceGoToStart;

export function reduceGoToStart<T>(state: DataSourceState<T>, action: GoToStart) {
    if (!state.pagination) throw new Error("Data Source is not paginated");

    return {
        ...state,
        action: action.type,
        pagination: {
            ...state.pagination,
            page: 1
        },
    }
}

export type TReduceGoToPrev<T> = typeof reduceGoToPrev;

export function reduceGoToPrev<T>(state: DataSourceState<T>, action: GoToPrev) {
    if (!state.pagination) throw new Error("Data Source is not paginated");

    return {
        ...state,
        action: action.type,
        pagination: {
            ...state.pagination,
            page: Math.max(1, state.pagination.page - 1),
        },
    }
}

export type TReduceGoToNext<T> = typeof reduceGoToNext;

export function reduceGoToNext<T>(state: DataSourceState<T>, action: GoToNext) {
    if (!state.pagination) throw new Error("Data Source is not paginated");

    return {
        ...state,
        action: action.type,
        pagination: {
            ...state.pagination,
            page: state.pages && Math.min(state.pages.length, state.pagination.page + 1),
        },
    }
}
