// TODO - fix alias issue with Jest
import { TDataTableColumn, TDataTableRow, useDataTableStoreRef } from '../../../components';
import { useCallback } from 'react';
import type { CellIndices } from '../types';

export const normalizeCellHandler = ({
    columnIndex,
    rowIndex,
    columns,
    records,
}: CellIndices & { records: TDataTableRow[]; columns: TDataTableColumn[] }) => {
    return {
        columnIndex,
        rowIndex,
        rowId: records[rowIndex],
        columnId: columns[columnIndex],
    };
};

// TODO - add testcases
const useNormalizeCellHandler = () => {
    const { store: datatableStore } = useDataTableStoreRef();

    return useCallback(
        ({ columnIndex, rowIndex }: { columnIndex: number; rowIndex: number }) => {
            return normalizeCellHandler({
                columnIndex,
                rowIndex,
                records: datatableStore.current.records,
                columns: datatableStore.current.columns,
            });
        },
        [datatableStore],
    );
};

export default useNormalizeCellHandler;
