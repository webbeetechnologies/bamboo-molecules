
import { useCallback } from "react";
import {CallBackFuncType, createDataSourceHook} from "../createDataSourceHook";
import {IDataSource, IDataSourceState} from "../types";
import {reducer} from "./reducers";


const useDataSource = createDataSourceHook({ reducer });


export type UseAsyncDataSource = <ResultType>(data: IDataSourceState, func: CallBackFuncType) => IDataSource


export const useArrayDataSource: UseAsyncDataSource = <T>(data: IDataSourceState, func: CallBackFuncType) => {
    const handledFunc: CallBackFuncType = useCallback(<ResultType>(state: IDataSourceState) => func(state), [func]);
    
    return useDataSource(data, handledFunc);
}