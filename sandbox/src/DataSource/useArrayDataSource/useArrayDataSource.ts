
import { useCallback } from "react";
import {CallBackFuncType, createDataSourceHook} from "../createDataSourceHook";
import {IDataSource, IDataSourceState, IFilterableDataSource, TStoreConfig} from "../types";
import {reducer} from "./reducers";


const useDataSource = createDataSourceHook({ reducer });


export type UseAsyncDataSource = <ResultType>(data: IDataSourceState, func: CallBackFuncType) => IDataSource




export function useArrayDataSource <T>(data: IDataSourceState, func: CallBackFuncType,  storeConfig?: Omit<TStoreConfig, "loadable">) {
    const handledFunc: CallBackFuncType = useCallback(<ResultType>(state: IDataSourceState) => func(state), [func]);
    
    return useDataSource(data, handledFunc, storeConfig);
}