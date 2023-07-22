import { createContext, memo, ReactNode, useContext } from 'react';
import type { Field } from '../types';

export type HooksContextType = {
    useField: (columnId: string) => Field;
    useCellValue: <T>(rowId: string, columnId: string) => [T, (newValue: T) => void];
};

const HooksContext = createContext<HooksContextType | null>(null);

export const useHooks = () => {
    const contextValue = useContext(HooksContext);

    if (contextValue === null) throw new Error('useHooks should be used inside the HooksProvider');

    return contextValue;
};

export const HooksProvider = memo(
    ({ value, children }: { value: HooksContextType; children: ReactNode }) => {
        return <HooksContext.Provider value={value}>{children}</HooksContext.Provider>;
    },
);
