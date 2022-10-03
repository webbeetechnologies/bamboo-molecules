import {IDataSourceState, LoadingState} from "../types";
import { prepareRecords } from "./prepareRecords";
import {CompleteLoadAction, ErrorLoadAction, LoadInitialResults, StartLoadAction} from "./types";


export function reduceStartLoadResults<T>(state: IDataSourceState, action: StartLoadAction) {
    return {
        ...state,
        action: action.type,
        loading: {
            ...state.loading,
            started_at: new Date().getTime(),
        }
    }
}



export function reduceCompleteLoadResults<T>(state: IDataSourceState, action: CompleteLoadAction) {
    return {
        ...state,
        ...prepareRecords({
            action: action.type,
            records: action.payload,
            loading: {
                ...state.loading,
                finished_at: new Date().getTime(),
            } as LoadingState
        })
    }
}



export function reduceErrorLoadResults<T>(state: IDataSourceState, action: ErrorLoadAction) {
    return {
        ...state,
        action: action.type,
        loading: {
            ...state.loading,
            errored_at: new Date().getTime(),
        }
    }
}



export function reduceLoadInitialResults<T>(state: IDataSourceState, action: LoadInitialResults) {
    return {
        ...state,
        action: action.type,
    }
}