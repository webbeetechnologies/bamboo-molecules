import { memo, ReactNode, useMemo } from 'react';
import type { Field } from '../../../../src/datagrid/types';
import { keyBy } from '../../../../src/utils';

import { createFastContext } from '@bambooapp/bamboo-molecules/fast-context';

export type FieldConfigs = Record<
    string,
    {
        width?: number;
        visible?: boolean;
    }
>;

export type FieldsContextType = {
    fields: Field[];
    fieldsConfigs: FieldConfigs;
};

const { Provider: FieldsContextProvider, useContext: useFieldsSelector } =
    createFastContext<FieldsContextType>();

const emptyObj = {};

export type FieldsProviderProps = {
    fields: Field[];
    fieldsConfigs?: FieldConfigs;
    children: ReactNode;
};

export const FieldsProvider = memo(
    ({ fields, fieldsConfigs = emptyObj, children }: FieldsProviderProps) => {
        const contextValue = useMemo(
            () => ({
                fields,
                fieldsConfigs,
            }),
            [fieldsConfigs, fields],
        );

        return <FieldsContextProvider value={contextValue}>{children}</FieldsContextProvider>;
    },
);

const fieldSelector = (id: string, fields: Field[]) => {
    const fieldsMapById = keyBy(fields, 'id');

    if (!fieldsMapById[id]) {
        throw new Error(`could not find the field ${id}`);
    }

    return fieldsMapById[id] as Field;
};

export const useField = (id: string) => {
    const [field] = useFieldsSelector(store => {
        return fieldSelector(id, store.fields);
    });

    return field;
};

const fieldConfigSelector = (id: string, fieldsConfigs: FieldConfigs) => {
    return fieldsConfigs[id] || emptyObj;
};

export const useFieldConfigs = (id: string) => {
    const [fieldConfigs] = useFieldsSelector(store => {
        return fieldConfigSelector(id, store.fieldsConfigs);
    });

    return [fieldConfigs];
};
