import { createContext, memo, ReactNode, useContext } from 'react';
import type { Field } from '../types';
import type { TDataTableColumn, TDataTableRow } from '../../../src/components/DataTable/types';
import type { RecordWithId } from '../utils';

export type HooksContextType = {
    useField: (columnId: TDataTableColumn) => Field;
    useCellValue: (
        rowId: TDataTableRow,
        columnId: TDataTableColumn,
    ) => readonly [
        RecordWithId,
        (newValue: Partial<RecordWithId> & Pick<RecordWithId, 'id'>) => void,
    ];
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
