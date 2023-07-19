import { createContext, memo, ReactNode, useContext } from 'react';
import type { FieldTypes } from '../types';

const fieldTypesContext = createContext<FieldTypes>({});

export const useFieldTypes = () => useContext(fieldTypesContext);

export const FieldTypesProvider = memo(
    ({ value, children }: { value: FieldTypes; children: ReactNode }) => {
        return <fieldTypesContext.Provider value={value}>{children}</fieldTypesContext.Provider>;
    },
);

export const useFieldType = (type: string) => {
    const fieldTypes = useFieldTypes();
    const fieldType = fieldTypes[type];

    if (!fieldType) throw new Error('Field type not found');

    return fieldType;
};
