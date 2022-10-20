import {useCallback, useEffect, useMemo, useReducer, useRef,} from "react";

import {IDataSourceState, DataSourceResult, ITypedDataSourceState, Records, TStoreConfig} from "./types";
import {TApplyFilterFunc} from "./FilterableDataSource";
import {TApplySortFunc} from "./SortableDataSource";
import {ActionInterface, EStoreActions} from "./reducers/types";
import {prepareRecords as PrepareRecords} from "./reducers/prepareRecords";
import { RecordType } from "../types";

export type CreateDataSourceHookArgs = {
    prepareRecords?: typeof PrepareRecords,
    reducer: (state: IDataSourceState, action: ActionInterface) => IDataSourceState
}

export type CallBackFuncType<T extends {} = {}> = (state: IDataSourceState<T>) => MaybePromise<Records<T>>



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

export const createDataSourceHook = (props = {} as CreateDataSourceHookArgs) =>  {
    const { prepareRecords = PrepareRecords, reducer } = props;

    return (
        <ResultType extends {}>(data: ITypedDataSourceState<ResultType>, func: CallBackFuncType<ResultType>, storeSupports = STORE_SUPPORT) => {
            const {records, ...store} = data;

            const initialState = useMemo(() => prepareRecords({
                records, ...store,
            }), []);

            const [ state, dispatch ] = useDispatcher(reducer, initialState as ITypedDataSourceState<ResultType>);

            const updateAction = useCallback( (action: ActionInterface["type"], payload?: ActionInterface["payload"]) => {
                dispatch({ type: action, payload })
            }, [state, dispatch]);

            const setRecords = useCallback((records: Records<ResultType>) => {
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
                        const newRecords = await func(state as ITypedDataSourceState<ResultType>);

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
            } as unknown as DataSourceResult<ResultType> & { dispatch: React.Dispatch<ActionInterface> };
        }
    )
}