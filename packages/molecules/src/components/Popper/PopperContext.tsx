import { createContext, useContext } from 'react';
import type { TPopperContext } from './types';

export const PopperContext = createContext({} as TPopperContext);

export const usePopperContext = () => {
    return useContext(PopperContext);
};
