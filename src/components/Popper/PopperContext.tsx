import {createContext, useContext} from "react";

export const PopperContext = createContext({} as any);

export const usePopperContext = () => {
    return useContext(PopperContext);
};