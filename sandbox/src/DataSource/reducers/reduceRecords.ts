import {SetRecordsAction, UpdateRecordsAction, UpdateRecordsErrorAction} from "./types";
import {prepareRecords} from "./prepareRecords";
import {IDataSourceState} from "../types";


export function reduceRecords<T>(state: IDataSourceState, action: SetRecordsAction) {
    return {
        ...state,
        ...prepareRecords({
            ...state,
            action: action.type,
            originalRecords: [ ...action.payload.records ],
            records: action.payload.records,
        }),
    };
}

export function reduceUpdateRecords<T>(state: IDataSourceState, action: UpdateRecordsAction) {
    return {
        ...state,
        ...prepareRecords({
            ...state,
            records: action.payload.records,
        }),
    };
}

export function reduceUpdateRecordsError<T>(state: IDataSourceState, action: UpdateRecordsErrorAction) {
    return {
        ...state,
        error: action.payload.error,
    };
}