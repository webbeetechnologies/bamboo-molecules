// TODO - fix alias issue with Jest
import { useCallback } from 'react';
import { useDataTableStoreRef } from '../../../components';
import type { SelectionIndices, TableSelection, TableSelectionBeforeCommit } from '../types';
import { useTableManagerStoreRef } from '../..';

const getItemsInRange = (array: any[], startIndex: number, endIndex: number) => {
    const [start, end] = [startIndex, endIndex].sort((x, y) => x - y);
    return array.slice(start, end + 1);
};

export const normalizeSelectionHandler = ({
    start,
    end,
    columnIds,
    records,
}: TableSelection): TableSelectionBeforeCommit => {
    const _records = getItemsInRange(records, start?.rowIndex, end?.rowIndex);

    return {
        start,
        end,
        startRecord: records[start.rowIndex],
        endRecord: records[end?.rowIndex],
        records: _records,
        recordIds: _records.map(record => record.id),
        columnIds: getItemsInRange(columnIds, start?.columnIndex, end?.columnIndex),
    };
};

// TODO - add testcases
const useNormalizeSelectionHandler = () => {
    const { store: datatableStore } = useDataTableStoreRef();
    const { store: tableManagerStore } = useTableManagerStoreRef();

    return useCallback(
        ({ start, end }: SelectionIndices) => {
            return normalizeSelectionHandler({
                start,
                end,
                columnIds: datatableStore.current.columns,
                recordIds: datatableStore.current.records,
                records: tableManagerStore.current.records,
            });
        },
        [datatableStore, tableManagerStore],
    );
};

export default useNormalizeSelectionHandler;
