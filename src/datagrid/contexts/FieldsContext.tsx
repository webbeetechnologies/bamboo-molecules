import { memo, ReactNode, useMemo } from 'react';
import type { Field } from '../types';
import { keyBy } from '../../utils';

import {
    createFastContext,
    createUseContext,
    createProvider,
} from '@bambooapp/bamboo-molecules/fast-context';

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

const FieldsContext = createFastContext<FieldsContextType>({ fields: [], fieldsConfigs: {} });

const FieldsContextProvider = createProvider(FieldsContext);

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

const useFieldContext = createUseContext(FieldsContext);

const fieldSelector = (id: string, fields: Field[]) => {
    const fieldsMapById = keyBy(fields, 'id');

    if (!fieldsMapById[id]) {
        throw new Error(`could not find the field ${id}`);
    }

    return fieldsMapById[id] as Field;
};

export const useField = (id: string) => {
    const [field] = useFieldContext(store => {
        return fieldSelector(id, store.fields);
    });

    return field;
};

const fieldConfigSelector = (id: string, fieldsConfigs: FieldConfigs) => {
    return fieldsConfigs[id] || emptyObj;
};

export const useFieldConfigs = (id: string) => {
    const [fieldConfigs] = useFieldContext(store => {
        return fieldConfigSelector(id, store.fieldsConfigs);
    });

    return [fieldConfigs];
};
