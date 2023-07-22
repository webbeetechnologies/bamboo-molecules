import { memo, ReactNode, useCallback, useMemo } from 'react';
import type { Row } from '../types';
import { keyBy } from '../../utils';

import { createFastContext } from '@bambooapp/bamboo-molecules/fast-context';

export type RecordsContextType = {
    records: Record<string, Row>;
};

const {
    Provider: RecordsContextProvider,
    useContext: useRecordsSelector,
    useStoreRef,
} = createFastContext<RecordsContextType>();

export const RecordsProvider = memo(
    ({ records, children }: { records: Row[]; children: ReactNode }) => {
        const contextValue = useMemo(
            () => ({
                records: keyBy(records, 'id'),
            }),
            [records],
        );

        return <RecordsContextProvider value={contextValue}>{children}</RecordsContextProvider>;
    },
);

export const useRecordsStoreRef = useStoreRef;

const recordSelector = (id: string, records: Record<string, Row>) => {
    if (!records[id]) {
        throw new Error(`could not find the row ${id}`);
    }

    return records[id] as Row;
};

export const useRecord = (id: string): [Row, (value: any) => void] => {
    const [record, setStore] = useRecordsSelector(store => {
        return recordSelector(id, store.records);
    });

    const setRecordValue = useCallback(
        (value: Row) => {
            setStore(prev => ({
                ...prev,
                records: {
                    ...prev.records,
                    [id]: {
                        ...prev.records[id],
                        ...value,
                    },
                },
            }));
        },
        [id, setStore],
    );

    return [record, setRecordValue];
};

const cellValueSelector = (id: string, fieldId: string, records: Record<string, Row>) => {
    if (!records[id]) {
        throw new Error(`could not find the row ${id}`);
    }

    return records[id][fieldId] as any;
};

export const useCellValue = (id: string, fieldId: string) => {
    const [value, setStore] = useRecordsSelector(store => {
        return cellValueSelector(id, fieldId, store.records);
    });

    const setCellValue = useCallback(
        (newValue: any) => {
            setStore(prev => {
                return {
                    ...prev,
                    records: {
                        ...prev.records,
                        [id]: {
                            ...prev.records[id],
                            [fieldId]: newValue,
                        },
                    },
                };
            });
        },
        [fieldId, id, setStore],
    );

    return [value, setCellValue];
};
