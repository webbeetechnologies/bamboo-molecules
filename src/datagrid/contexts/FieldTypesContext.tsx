import { createContext, memo, ReactNode, useContext } from 'react';
import type { FieldType, FieldTypes } from '../types';

export const FieldTypesContext = createContext<FieldTypes>({});

export const useFieldTypes = () => useContext(FieldTypesContext);

export const FieldTypesProvider = memo(
    ({ value, children }: { value: FieldTypes; children: ReactNode }) => {
        return <FieldTypesContext.Provider value={value}>{children}</FieldTypesContext.Provider>;
    },
);

const emptyObj = {} as FieldType;

export const useFieldType = (type: string): FieldType => {
    const fieldTypes = useFieldTypes();

    if (!type) return emptyObj;

    const fieldType = fieldTypes[type];

    if (!fieldType) throw new Error('Field type not found');

    return fieldType;
};
