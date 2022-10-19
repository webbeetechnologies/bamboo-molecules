import {useCallback, useEffect, useMemo, useReducer, useRef,} from "react";

import {IDataSource, IDataSourceState, IFilterableDataSource, IOrderableDataSource, IPaginatedDataSource, ISortableDataSource, Records, TSetRecords, TStoreConfig} from "./types";
import {TApplyFilterFunc} from "./FilterableDataSource";
import {TApplySortFunc} from "./SortableDataSource";
import {ActionInterface, EStoreActions} from "./reducers/types";
import {prepareRecords as PrepareRecords} from "./reducers/prepareRecords";

export type CreateDataSourceHookArgs = {
    prepareRecords?: typeof PrepareRecords,
    reducer: (state: IDataSourceState, action: ActionInterface) => IDataSourceState
}

export type CallBackFuncType = <T>(state: IDataSourceState) => MaybePromise<Records<T>>

type UseDataSource = (data: IDataSourceState, func: CallBackFuncType, storeSupport?: TStoreConfig) => IDataSource;



export const STORE_SUPPORT: TStoreConfig = {
    loadable: false,
    filterable: false,
    sortable: false,
    pageable: false,
    orderable: false,
}


const useDispatcher = (reducer: CreateDataSourceHookArgs["reducer"], initialState: IDataSourceState) => {
    return useReducer(reducer, initialState as IDataSourceState);
}



export const createDataSourceHook = (props = {} as CreateDataSourceHookArgs): UseDataSource =>  {
    const { prepareRecords = PrepareRecords, reducer } = props;

    return (data: IDataSourceState, func: CallBackFuncType, storeSupports = STORE_SUPPORT) => {
        const {records, ...store} = data;

        const initialState = useMemo(() => prepareRecords({
            records, ...store,
        }), []);

        const [ state, dispatch ] = useDispatcher(reducer, initialState as IDataSourceState);

        const updateAction = useCallback( (action: ActionInterface["type"], payload?: any) => {
            dispatch({ type: action, payload })
        }, [state, dispatch]);

        const setRecords: TSetRecords = useCallback(<ResultType>(records: Records<ResultType>) => {
            dispatch({
                type: EStoreActions.SET_RECORDS,
                payload: {records}
            });
        }, [ state, updateAction ]);


        const applyFilter: TApplyFilterFunc = useCallback((filter) => {
            updateAction(EStoreActions.FILTER, filter);
        }, [ updateAction ]);


        const applySort: TApplySortFunc = useCallback((sort) => {
            updateAction(EStoreActions.SORT, sort)
        }, [ updateAction ]);


        const removeSort: TApplySortFunc = useCallback((sort) => {
            updateAction(EStoreActions.REMOVE_SORT, sort)
        }, [ updateAction ]);


        const goToNext: Function = useCallback(() => {
            updateAction(EStoreActions.GO_TO_NEXT)
        }, [ updateAction ]);


        const goToPrev: Function = useCallback(() => {
            updateAction(EStoreActions.GO_TO_PREV)
        }, [ updateAction ]);


        const goToStart: Function = useCallback(() => {
            updateAction(EStoreActions.GO_TO_START)
        }, [ updateAction ]);


        const goToEnd: Function = useCallback(() => {
            updateAction(EStoreActions.GO_TO_END)
        }, [ ]);


        const goTo: Function = useCallback((page: number) => {
            updateAction(EStoreActions.GO_TO, { page })
        }, [ ]);


        const action = state.action;
        useEffect(() => {
            if (action === EStoreActions.SET_RECORDS) { return; }
            (async () => {
                try {
                    const newRecords = await func(state);

                    if (state.records === newRecords) { return; }
                    dispatch({ type: EStoreActions.UPDATE_RECORDS, payload: { records: newRecords } });
                } catch (error) {
                    console.error(error);
                    dispatch({ type: EStoreActions.UPDATE_RECORDS_ERROR, payload: { error: error as Error } });
                    // stateGetter();
                }
            })()
        }, [action])


        return {
            ...state,
            dispatch,
            applySort,
            applyFilter,
            removeSort,
            goTo,
            goToStart,
            goToEnd,
            goToNext,
            goToPrev,
            setRecords
        };
    }
}