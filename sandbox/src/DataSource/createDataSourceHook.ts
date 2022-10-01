import {useCallback, useEffect, useRef, useState} from "react";

import {useDataSource} from "./useDataSource";
import {EStoreActions, IDataSource, Records, TSetRecords} from "./types";
import {TApplyFilterFunc} from "./FilterableDataSource";
import {TApplySortFunc} from "./SortableDataSource";
import {ActionInterface, DataSourceState} from "./actions.type";
import {prepareRecords as OgPrepareRecords} from "./reducers/prepareRecords";

type CreateDataSourceHookArgs<T> = {
    prepareRecords?: typeof OgPrepareRecords,
    reducer: (state: DataSourceState<T>, action: ActionInterface<T>) => DataSourceState<T>
}

type MaybePromise<T> = T | Promise<T>
type CallBackFuncType = <T>(arg: DataSourceState<T>) => MaybePromise<Records<T>>

export const createDataSourceHook = <ResultType>({ prepareRecords = OgPrepareRecords as typeof OgPrepareRecords<ResultType>, reducer } = {} as CreateDataSourceHookArgs<ResultType>) =>  {
    return ({records, ...data}: IDataSource<ResultType>, func: CallBackFuncType,) => {
        
        const [ state, setState ] = useState(() => prepareRecords({ records: records as Records<ResultType>, ...data, }) as DataSourceState<ResultType>),

            hasRendered = useRef(false),

            updateAction = useCallback( (action: ActionInterface<ResultType>["type"], payload?: any) => {
                (async () => {
                    try {
                        let newState = reducer(state, { type: action, payload } as  ActionInterface<ResultType>)
                        newState = action === EStoreActions.SET_RECORDS ? newState : {
                            ...newState,
                            records: await func({...newState }),
                        };

                        setState(newState as DataSourceState<ResultType>);
                    } catch (e) {
                        console.error(e);
                        return state;
                    }
                })()
            }, [state]),


            updateRecords: TSetRecords<ResultType> = useCallback((records: Records<ResultType>) => {
                    updateAction(EStoreActions.SET_RECORDS, records);  
            }, [ updateAction ]),


            setResults: TSetRecords<ResultType> = useCallback((records: Records<ResultType>) => {
                setState({
                    ...state,
                    action: EStoreActions.SET_RECORDS,
                    records,
                    originalRecords: records,
                });
            }, [ state, updateAction ]),


            applyFilter: TApplyFilterFunc = useCallback((filter) => {
                updateAction(EStoreActions.FILTER, filter);
            }, [ updateAction ]),


            applySort: TApplySortFunc = useCallback((sort) => {
                updateAction(EStoreActions.SORT, sort)
            }, [ updateAction ]),


            removeSort: TApplySortFunc = useCallback((sort) => {
                updateAction(EStoreActions.REMOVE_SORT, sort)
            }, [ updateAction ]),


            goToNext: Function = useCallback(() => {
                updateAction(EStoreActions.GO_TO_NEXT)
            }, [ updateAction ]),


            goToPrev: Function = useCallback(() => {
                updateAction(EStoreActions.GO_TO_PREV)
            }, [ updateAction ]),


            goToStart: Function = useCallback(() => {
                updateAction(EStoreActions.GO_TO_START)
            }, [ updateAction ]),


            goToEnd: Function = useCallback(() => {
                updateAction(EStoreActions.GO_TO_END)
            }, [ ]),


            goTo: Function = useCallback((page: number) => {
                updateAction(EStoreActions.GO_TO, { page })
            }, [ ])
        ;



        useEffect(() => {
            if (!hasRendered.current) {
                hasRendered.current = true;
                return;
            }

            setResults(records)
        }, [records, hasRendered]);

        return useDataSource<ResultType>({
            ...state,
            applySort,
            applyFilter,
            removeSort,
            goTo,
            goToStart,
            goToEnd,
            goToNext,
            goToPrev,
            setRecords: updateRecords as TSetRecords<ResultType>
        });
    }
}