
import {createDataSourceHook} from "../createDataSourceHook";
import {createReducer} from "../reducers/createReducer";


export const useArrayDataSource = createDataSourceHook({ reducer: createReducer() })