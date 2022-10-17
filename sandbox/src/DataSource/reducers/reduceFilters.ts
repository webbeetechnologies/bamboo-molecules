import {FilterAction} from "./types";
import {IDataSourceState} from "../types";

export function reduceFilters<T>(state: IDataSourceState, action: FilterAction) {
    if (!state.filters) throw new Error("Data Source is not filterable");

    return {
        ...state,
        action: action.type,
        filters: {
            ...state.filters,
            [action.payload.filterName]: {
                value: action.payload.value,
                operator: action.payload.operator
            }
        }
    }
}