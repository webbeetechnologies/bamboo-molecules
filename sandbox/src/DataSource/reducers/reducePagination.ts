import {GoTo, GoToEnd, GoToNext, GoToPrev, GoToStart} from "./types";
import {IDataSourceState} from "../types";

export function reduceGoTo<T>(state: IDataSourceState, action: GoTo) {
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


export function reduceGoToEnd<T>(state: IDataSourceState, action: GoToEnd) {
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


export function reduceGoToStart<T>(state: IDataSourceState, action: GoToStart) {
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


export function reduceGoToPrev<T>(state: IDataSourceState, action: GoToPrev) {
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


export function reduceGoToNext<T>(state: IDataSourceState, action: GoToNext) {
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
