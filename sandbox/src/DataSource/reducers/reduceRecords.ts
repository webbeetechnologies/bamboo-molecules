import {SetRecordsAction, UpdateRecordsAction} from "./types";
import {prepareRecords} from "./prepareRecords";
import {IDataSourceState} from "../types";


export function reduceRecords<T>(state: IDataSourceState, action: SetRecordsAction) {
    return {
        ...state,
        ...prepareRecords({
            ...state,
            action: action.type,
            originalRecords: [ ...action.payload ],
            records: action.payload,
        }),
    };
}

export function reduceUpdateRecords<T>(state: IDataSourceState, action: UpdateRecordsAction) {
    return {
        ...state,
        ...prepareRecords({
            ...state,
            records: action.payload,
        }),
    };
}