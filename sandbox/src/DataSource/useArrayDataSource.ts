import {useEffect, useState, useCallback} from "react";

import {useDataSource} from "./useDataSource";
import {EStoreActions, IDataSource, TFilters, Records, TSort} from "./types";
import {TSetRecordArg, TSetRecords} from "./types";
import {TApplyFilterFunc} from "./FilterableDataSource";
import {TApplySortFunc} from "./SortableDataSource";

type FilterAction = { type: EStoreActions.FILTER, payload: TFilters };

type SortAction = { type: EStoreActions.SORT, payload: TSort & Record<"column", string> };

type RemoveSortAction = { type: EStoreActions.REMOVE_SORT, payload: TSort };

type SetRecordsAction<T> = { type: EStoreActions.SET_RECORDS, payload: Records<T> };

type ActionInterface<T> = SortAction | FilterAction | SetRecordsAction<T> | RemoveSortAction;


const reducer = <T>(state: any, action: ActionInterface<T>) => {
    switch (action.type) {
        case EStoreActions.FILTER: {
            return {
                ...state,
                action: action.type,
                filter: {
                    ...state.filter,
                    [ action.payload.filterName ]: {
                        value: action.payload.value,
                        operator: action.payload.operator
                    }
                }
            }
        }

        case EStoreActions.SORT: {
            let sort = state.sort;
            const { column, direction } = action.payload,
                sortItemIndex = sort.findIndex(({ column }: any) => column === action.payload.column ),
                newSortItem = { column, direction };

            if (sortItemIndex < 0) sort = [ ...sort, newSortItem ];
            else sort[sortItemIndex] = newSortItem;

            return {
                ...state,
                action: action.type,
                sort,
            }
        }

        case EStoreActions.SET_RECORDS: {
            return {
                ...state,
                action: action.type,
                records: action.payload,
            }
        }
    }
    
    return state;
}





export const useArrayDataSource = <ResultType>(records: Records<ResultType>, func: (arg: IDataSource<ResultType>) => Records<ResultType>) => {
    const [ state, setState ] = useState(() => ({ records, sort: [], filters: {} })),

        updateAction = useCallback((action: ActionInterface<ResultType>["type"], payload: any) => {
            setState((state) => {
                const newState = reducer<ResultType>(state, { type: action, payload})
                return action === EStoreActions.SET_RECORDS ? newState : {
                    ...newState,
                    records: func({...newState, action}),
                };
            });
        }, []),


        _setResults: TSetRecords<ResultType> = useCallback((records: TSetRecordArg<ResultType>) => {
                updateAction(EStoreActions.SET_RECORDS, records);  
        }, [ ]),


        applyFilter: TApplyFilterFunc = useCallback((filter) => {
            updateAction(EStoreActions.FILTER, filter);  
        }, [ ]),


        applySort: TApplySortFunc = useCallback((sort) => {
            updateAction(EStoreActions.SORT, sort)
        }, [ ]),


        removeSort: TApplySortFunc = useCallback((sort) => {
            updateAction(EStoreActions.REMOVE_SORT, sort)
        }, [ ])
    ;



    useEffect(() => {
        _setResults(records)
    }, [_setResults, records]);

    console.log({ filters: state.filters })

    return useDataSource<ResultType>({
        ...state,
        // @ts-ignore
        applySort,
        applyFilter,
        removeSort,
        setRecords: _setResults as TSetRecords<ResultType>
    });
}