import {DataSourceState, SetRecordsAction} from "../actions.type";
import {prepareRecords} from "./prepareRecords";

export type TReduceRecords<T> = typeof reduceRecords;

export function reduceRecords<T>(state: DataSourceState<T>, action: SetRecordsAction<T>) {
    return {
        ...state,
        ...prepareRecords({
            ...state,
            records: action.payload,
        }),
    };
}