
import {useCallback} from "react";
import {CallBackFuncType, createDataSourceHook} from "../createDataSourceHook";
import {IDataSource, IDataSourceState, Records} from "../types";
import {reducer} from "./reducer";
import {EStoreActions} from "../reducers/types";


export const useDataSource = createDataSourceHook({ reducer })

const loading = {
    started_at: null,
    errored_at: null,
    finished_at: null
};

const isLoadingAction = (action: EStoreActions) => [EStoreActions.LOAD_RESULTS_START, EStoreActions.LOAD_RESULTS_DONE, EStoreActions.LOAD_RESULTS_ERROR].includes(action)


export type UseAsyncDataSource = <ResultType>(data: IDataSourceState, func: CallBackFuncType) => Omit<IDataSource, "dispatch"> & { loadResults: Function }


export const useAsyncDataSource: UseAsyncDataSource = <ResultType>(data: IDataSourceState, func: CallBackFuncType) => {
    const callAsyncFunc: CallBackFuncType = useCallback(async (state: IDataSourceState) => {
            if (isLoadingAction(state.action as EStoreActions)) {
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

        { dispatch, getState, ...dataStore} = useDataSource({...data, loading }, callAsyncFunc),




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



    console.log("isLoading", isLoading())


    // console.log({
    //     isLoading: isLoading(),
    //     hasErrored: hasErrored(),
    //     hasLoaded: hasLoaded(),
    //     hasInitialized: hasInitialized(),
    //     ...getState(),
    // })


    return {
        ...dataStore,
        getState,
        loadResults,
        hasInitialized,
        hasLoaded,
        hasErrored
    }
}