
import {useCallback} from "react";
import {CallBackFuncType, createDataSourceHook} from "../createDataSourceHook";
import {IDataSourceState, ILoadableDataSource, ITypedDataSource, ITypedDataSourceState, LoadingState, Records, TStoreConfig} from "../types";
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


export const useAsyncDataSource = <ResultType extends {}>(data: ITypedDataSourceState<ResultType>, func: CallBackFuncType<ResultType>, storeSupports?: TStoreConfig) => {
    const callAsyncFunc: CallBackFuncType<ResultType> = async (state: ITypedDataSourceState<ResultType>) => {
        if (isLoading(state) || isLoadingAction(state.action as EStoreActions)) {
            return state.records;
        }

        try {
            dispatch({type: EStoreActions.LOAD_RESULTS_START});
            let records: MaybePromise<Records<ResultType>> = func(state);

            const markAsCompleted = (records: Records<ResultType>) => dispatch({ type: EStoreActions.LOAD_RESULTS_DONE, payload: {records} })

            if (records instanceof Promise) {
                records = await records;
                markAsCompleted(records)
            } else {
                markAsCompleted(records);
            }
        } catch (error) {
            console.error(error);
            dispatch({ type: EStoreActions.LOAD_RESULTS_ERROR, payload: { error: error as Error } })
        }

        return state.records;
    };

    const { dispatch, ...dataStore} = useDataSource({...data, loading }, callAsyncFunc, {...storeSupports, loadable: true });
    return {
        ...dataStore,
        loadResults: useCallback(() => {
            dispatch({type: EStoreActions.LOAD_INITIAL_RESULTS});
        }, []),
        hasInitialized: hasInitialized(dataStore),
        hasLoaded: hasLoaded(dataStore),
        hasErrored: hasErrored(dataStore),
        isLoading: isLoading(dataStore)
    }
}



const isLoading = (state: {loading?: LoadingState}) => {
    const loading = state.loading;

    if (!loading) { return false; }
    if (!loading.started_at) { return false; }

    return (Number(loading.finished_at) < Number(loading.started_at) && Number(loading.errored_at) < Number(loading.started_at))
};


const hasErrored = (state: {loading?: LoadingState}) => {
    const loading = state.loading;

    if (!loading) { return false; }
    if (!loading.errored_at) { return false; }

    return (Number(loading.finished_at) < Number(loading.errored_at) && Number(loading.started_at) < Number(loading.errored_at))
};


const hasLoaded = (state: {loading?: LoadingState}) => {
    const loading = state.loading;

    if (!loading) { return false; }
    if (!loading.finished_at) { return false; }

    return (Number(loading.started_at) < Number(loading.finished_at) && Number(loading.errored_at) < Number(loading.finished_at))
};


const hasInitialized = (state: {loading?: LoadingState}) => {
    return !!state.loading?.started_at;
};