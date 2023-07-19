import { memo, ReactNode, useCallback, useMemo } from 'react';
import type { Row } from '../types';
import { keyBy } from '../../utils';

import { createFastContext, createUseContext, createProvider } from '@bambooapp/bamboo-molecules';

export type RecordsContextType = {
    records: Record<string, Row>;
    focusedCell: { recordId: string; fieldId: string } | null;
};

const RecordsContext = createFastContext<RecordsContextType>({ records: {}, focusedCell: null });

const RecordsContextProvider = createProvider(RecordsContext);

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

const useRecordContext = createUseContext(RecordsContext);

const recordSelector = (id: string, records: Record<string, Row>) => {
    if (!records[id]) {
        throw new Error(`could not find the row ${id}`);
    }

    return records[id] as Row;
};

export const useRecord = (id: string): [Row, (value: any) => void] => {
    const [record, setStore] = useRecordContext(store => {
        return recordSelector(id, store.records);
    });

    const setRecordValue = useCallback(
        (value: Row) => {
            setStore(prev => ({
                ...prev,
                records: {
                    ...prev.records,
                    [id]: {
                        ...prev[id],
                        ...value,
                    },
                },
            }));
        },
        [id, setStore],
    );

    return [record, setRecordValue];
};

export const useFocusedCell = (
    recordId: string,
    fieldId: string,
): [boolean, (cell: RecordsContextType['focusedCell']) => void] => {
    const [isFocused, setStore] = useRecordContext(store => {
        return store.focusedCell?.recordId === recordId && store.focusedCell?.fieldId === fieldId;
    });

    const setFocusedCell = useCallback(
        (cell: RecordsContextType['focusedCell']) => {
            setStore(prev => ({
                ...prev,
                focusedCell: cell,
            }));
        },
        [setStore],
    );

    return [isFocused, setFocusedCell];
};

const cellValueSelector = (id: string, fieldId: string, records: Record<string, Row>) => {
    if (!records[id]) {
        throw new Error(`could not find the row ${id}`);
    }

    return records[id][fieldId] as any;
};

export const useCellValue = (id: string, fieldId: string) => {
    const [value, setStore] = useRecordContext(store => {
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
