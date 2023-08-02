import { createContext, memo, ReactNode, useContext } from 'react';
import type { TDataTableColumn, TDataTableRow } from '@bambooapp/bamboo-molecules/components';

import type { Field } from '../types';

export type HooksContextType = {
    useField: (columnId: TDataTableColumn) => Field;
    useCellValue: <T>(
        rowId: TDataTableRow,
        columnId: TDataTableColumn,
    ) => [T, (newValue: T) => void];
};

const HooksContext = createContext<HooksContextType | null>(null);

const useHooks = () => {
    const contextValue = useContext(HooksContext);

    if (contextValue === null) throw new Error('useHooks should be used inside the HooksProvider');

    return contextValue;
};

export const useField: HooksContextType['useField'] = id => {
    const { useField: useFieldProp } = useHooks();
    return useFieldProp(id);
};

export const useCellValue: HooksContextType['useCellValue'] = (rowId, columnId) => {
    const { useCellValue: useCellValueProp } = useHooks();
    return useCellValueProp(rowId, columnId);
};

export const HooksProvider = memo(
    ({ value, children }: { value: HooksContextType; children: ReactNode }) => {
        return <HooksContext.Provider value={value}>{children}</HooksContext.Provider>;
    },
);
