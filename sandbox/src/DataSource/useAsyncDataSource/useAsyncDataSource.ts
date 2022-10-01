
import {createDataSourceHook} from "../createDataSourceHook";
import {createReducer} from "../reducers/createReducer";


export const useAsyncDataSource = createDataSourceHook({ reducer: createReducer() })