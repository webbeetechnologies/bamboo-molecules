// TODO - fix alias issue with Jest
import { useCallback } from 'react';
import { GroupRecord, useTableManagerStoreRef } from '../..';
import { useDataTableStoreRef } from '../../../components';

// TODO - add testcases
const useNormalizeCellHandler = () => {
    const { store: tableManagerStore } = useTableManagerStoreRef();
    const { store: dataTableStore } = useDataTableStoreRef();

    return useCallback(
        ({ columnIndex, rowIndex }: { columnIndex: number; rowIndex: number }) => {
            const getCorrectRowIndex = (index: number) => {
                if (tableManagerStore.current.records[index].rowType === 'data') return index;
                throw new Error('Record is not a data row');
            };

            const correctIndex = getCorrectRowIndex(rowIndex);
            const record = tableManagerStore.current.records[correctIndex] as GroupRecord;

            return {
                columnIndex,
                rowIndex: record.index,
                rowId: record.id,
                record,
                columns: dataTableStore.current.columns[columnIndex],
            };
        },
        [tableManagerStore, dataTableStore],
    );
};

export default useNormalizeCellHandler;
