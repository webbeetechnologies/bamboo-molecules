
import { useCallback } from "react";
import {CallBackFuncType, createDataSourceHook} from "../createDataSourceHook";
import {DataSourceResult, ITypedDataSourceState, TStoreConfig} from "../types";
import {reducer} from "./reducers";


const useDataSource = createDataSourceHook({ reducer });




export function useArrayDataSource <ResultType extends {}>(data: ITypedDataSourceState<ResultType>, func: CallBackFuncType<ResultType>,  storeConfig?: Omit<TStoreConfig, "loadable">): DataSourceResult<ResultType> {
    const handledFunc = useCallback((state: ITypedDataSourceState<ResultType>) => func(state), [func]) as CallBackFuncType<ResultType>;
    
    return useDataSource(data, handledFunc, storeConfig);
}