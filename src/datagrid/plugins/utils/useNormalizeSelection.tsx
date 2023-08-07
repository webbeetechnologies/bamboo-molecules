// TODO - fix alias issue with Jest
import { TDataTableColumn, TDataTableRow, useDataTableStoreRef } from '../../../components';
import { useCallback } from 'react';
import type { CellIndexes } from '../cell-selection';

const getItemsInRange = (array: any[], startIndex: number, endIndex: number) => {
    const [start, end] = [startIndex, endIndex].sort((x, y) => x - y);
    return array.slice(start, end + 1);
};

export const normalizeSelectionHandler = ({
    start,
    end,
    records,
    columns,
}: {
    start: CellIndexes;
    end: CellIndexes;
    records: TDataTableRow[];
    columns: TDataTableColumn[];
}) => {
    return {
        start,
        end,
        recordIds: getItemsInRange(records, start?.rowIndex, end?.rowIndex),
        columnIds: getItemsInRange(columns, start?.columnIndex, end?.columnIndex),
    };
};

// TODO - add testcases
const useNormalizeSelectionHandler = () => {
    const { store: datatableStore } = useDataTableStoreRef();

    return useCallback(
        ({ start, end }: { start: CellIndexes; end: CellIndexes }) => {
            return normalizeSelectionHandler({
                start,
                end,
                columns: datatableStore.current.columns,
                records: datatableStore.current.records,
            });
        },
        [datatableStore],
    );
};

export default useNormalizeSelectionHandler;
