import {RemoveSortAction, SortAction} from "./types";
import {ESortDirection, IDataSourceState, TSort} from "../types";
import {prepareRecords} from "./prepareRecords";


export function reduceSort<T>(state: IDataSourceState, action: SortAction) {
    let sort = state.sort;

    // Allow sort on flat arrays.
    if ([ESortDirection.ASC, ESortDirection.DESC].includes(action.payload as ESortDirection)) {
        sort = [{
            direction: action.payload as ESortDirection,
            column: "",
        }]
    } else {
        if (!sort) throw new Error("Data Source is not sortable");

        const {column, direction = ESortDirection.ASC } = action.payload as TSort;

        const sortItemIndex = sort.findIndex((sort: any) => sort.column === column),
            newSortItem = {column, direction};


        if (sortItemIndex < 0) sort = [...sort, newSortItem];
        else sort[sortItemIndex] = newSortItem;
    }


    return prepareRecords({
        ...state,
        action: action.type,
        sort,
    })
}



export function reduceRemoveSort<T>(state: IDataSourceState, action: RemoveSortAction) {
    let sort = state.sort;
    if (!sort) throw new Error("Data Source is not sortable");

    if (sort.length === 1 && !sort[0].column) {
        sort = [];
    }

    return prepareRecords({
        ...state,
        action: action.type,
        sort: sort.filter(({column}: any) => column !== action.payload.column),
    })
}