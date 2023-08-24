// TODO - fix alias issue with Jest
import { useCallback } from 'react';
import { useDataTableStoreRef } from '../../../components';
import type { SelectionIndices, TableSelection } from '../types';

const getItemsInRange = (array: any[], startIndex: number, endIndex: number) => {
    const [start, end] = [startIndex, endIndex].sort((x, y) => x - y);
    return array.slice(start, end + 1);
};

export const normalizeSelectionHandler = ({ start, end, recordIds, columnIds }: TableSelection) => {
    return {
        start,
        end,
        recordIds: getItemsInRange(recordIds, start?.rowIndex, end?.rowIndex),
        columnIds: getItemsInRange(columnIds, start?.columnIndex, end?.columnIndex),
    };
};

// TODO - add testcases
const useNormalizeSelectionHandler = () => {
    const { store: datatableStore } = useDataTableStoreRef();

    return useCallback(
        ({ start, end }: SelectionIndices) => {
            return normalizeSelectionHandler({
                start,
                end,
                columnIds: datatableStore.current.columns,
                recordIds: datatableStore.current.records,
            });
        },
        [datatableStore],
    );
};

export default useNormalizeSelectionHandler;
