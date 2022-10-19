
import {useCallback} from "react";
import {CallBackFuncType, createDataSourceHook} from "../createDataSourceHook";
import {IDataSourceState, ILoadableDataSource, Records, TStoreConfig} from "../types";
import {reducer} from "./reducer";
import {EStoreActions} from "../reducers/types";


const useDataSource = createDataSourceHook({ reducer })


export type UseAsyncDataSource = (data: IDataSourceState, func: CallBackFuncType, storeSupports?: Omit<TStoreConfig, "loadable">) => Omit<ILoadableDataSource, "dispatch">




const loading = {
    started_at: null,
    errored_at: null,
    finished_at: null
};


const isLoadingAction = (action: EStoreActions) => [EStoreActions.LOAD_RESULTS_START, EStoreActions.LOAD_RESULTS_DONE, EStoreActions.LOAD_RESULTS_ERROR].includes(action)

export const useAsyncDataSource: UseAsyncDataSource = <ResultType>(data: IDataSourceState, func: CallBackFuncType, storeSupports?: TStoreConfig) => {
    const callAsyncFunc: CallBackFuncType = useCallback(async (state: IDataSourceState) => {
            if (isLoading() || isLoadingAction(state.action as EStoreActions)) {
                return state.records;
            }

            try {
                dispatch({type: EStoreActions.LOAD_RESULTS_START});
                let records: MaybePromise<Records<any>> = func(state);

                const markAsCompleted = (records: Records<any>) => dispatch({ type: EStoreActions.LOAD_RESULTS_DONE, payload: records })

                if (records instanceof Promise) {
                    records = await records;
                    markAsCompleted(records)
                } else {
                    markAsCompleted(records);
                }
            } catch (error) {
                console.error(error);
                dispatch({ type: EStoreActions.LOAD_RESULTS_ERROR })
            }

            return state.records;
        }, []),

        { dispatch, getState, ...dataStore} = useDataSource({...data, loading }, callAsyncFunc, {...storeSupports, loadable: true }),

        isLoading = useCallback(() => {
            const loading = getState().loading;

            if (!loading) { return false; }
            if (!loading.started_at) { return false; }


            return (Number(loading.finished_at) < Number(loading.started_at) && Number(loading.errored_at) < Number(loading.started_at))

        }, []),

        hasErrored = useCallback(() => {
            const loading = getState().loading;

            if (!loading) { return false; }
            if (!loading.errored_at) { return false; }

            return (Number(loading.finished_at) < Number(loading.errored_at) && Number(loading.started_at) < Number(loading.errored_at))
        }, []),



        hasLoaded = useCallback(() => {
            const loading = getState().loading;

            if (!loading) { return false; }
            if (!loading.finished_at) { return false; }

            return (Number(loading.started_at) < Number(loading.finished_at) && Number(loading.errored_at) < Number(loading.finished_at))
        }, []),



        hasInitialized = useCallback(() => !!getState().loading?.started_at, []),




        loadResults = useCallback(() => {
            dispatch({type: EStoreActions.LOAD_INITIAL_RESULTS});
        }, [])
    ;



    return {
        ...dataStore,
        getState,
        loadResults,
        hasInitialized,
        hasLoaded,
        hasErrored,
        isLoading
    }
}