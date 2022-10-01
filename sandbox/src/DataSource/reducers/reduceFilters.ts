import {DataSourceState, FilterAction} from "../actions.type";

export type TReduceFilters<T> = typeof reduceFilters<T>;

export function reduceFilters<T>(state: DataSourceState<T>, action: FilterAction) {
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