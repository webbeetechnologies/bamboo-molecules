// TODO - fix alias issue with Jest
import { useCallback } from 'react';
import { useTableManagerStoreRef, isDataRow } from '../..';
import { getRecordByIndex } from '../../utils';
import { TDataTableColumn, TDataTableRow, useDataTableStoreRef } from '../../../components';

// TODO - add testcases
const useNormalizeCellHandler = () => {
    const { store: tableManagerStore } = useTableManagerStoreRef();
    const { store: dataTableStore } = useDataTableStoreRef();

    return useCallback(
        ({
            columnIndex,
            rowIndex,
            columnId,
        }: {
            columnIndex: number;
            rowIndex: number;
            rowId?: TDataTableRow;
            columnId?: TDataTableColumn;
        }) => {
            const getDataRow = (index: number) => {
                const record = getRecordByIndex(tableManagerStore.current.records, index);
                if (!isDataRow(record)) throw new Error('Record is not a data row');
                return record;
            };

            const record = getDataRow(rowIndex);

            // for the case when the record is deleted
            if (!record.id) return undefined;

            // for focused cell, we can't just check the indices, we have to check with the ids to see if it exists or not
            // it's allowed for the record to be undefined thus we do not check for rowId.
            if (columnId && dataTableStore.current.columns[columnIndex] !== columnId)
                return undefined;

            return {
                columnIndex,
                rowIndex: record.index,
                rowId: record.id,
                record,
                columnId: dataTableStore.current.columns[columnIndex],
            };
        },
        [tableManagerStore, dataTableStore],
    );
};

export default useNormalizeCellHandler;
