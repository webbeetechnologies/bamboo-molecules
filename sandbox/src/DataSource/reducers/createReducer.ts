import {ActionInterface, EStoreActions} from "./types";
import {IDataSourceState} from "../types";


type ReducerCreatorArgs = Partial<Record<EStoreActions, Function>>


export const createReducer = (reducers = {} as ReducerCreatorArgs) => (state: IDataSourceState, action: ActionInterface) => {
    const reducer = reducers[action.type];

    if (!reducer) {
        throw new Error("Action has not been implemented");
    }

    return reducer(state, action);
}