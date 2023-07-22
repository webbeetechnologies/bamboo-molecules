import { createContext, memo, ReactNode, useContext } from 'react';
import type { FieldTypes } from '../types';

const FieldTypesContext = createContext<FieldTypes>({});

export const useFieldTypes = () => useContext(FieldTypesContext);

export const FieldTypesProvider = memo(
    ({ value, children }: { value: FieldTypes; children: ReactNode }) => {
        return <FieldTypesContext.Provider value={value}>{children}</FieldTypesContext.Provider>;
    },
);

export const useFieldType = (type: string) => {
    const fieldTypes = useFieldTypes();
    const fieldType = fieldTypes[type];

    if (!fieldType) throw new Error('Field type not found');

    return fieldType;
};
