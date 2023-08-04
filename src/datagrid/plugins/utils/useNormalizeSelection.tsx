import { useDataTableStoreRef } from '@bambooapp/bamboo-molecules/components';
import { useCallback } from 'react';
import type { CellIndexes } from '../cell-selection';

const getItemsInRange = (array: any[], startIndex: number, endIndex: number) => {
    const [start, end] = [startIndex, endIndex].sort((x, y) => x - y);
    return array.slice(start, end + 1);
};

// TODO - add testcases
const useNormalizeSelectionHandler = () => {
    const { store: datatableStore } = useDataTableStoreRef();

    return useCallback(
        ({ start, end }: { start: CellIndexes; end: CellIndexes }) => {
            return {
                start,
                end,
                recordIds: getItemsInRange(
                    datatableStore.current.records,
                    start?.rowIndex,
                    end?.rowIndex,
                ),
                columnIds: getItemsInRange(
                    datatableStore.current.columns,
                    start?.columnIndex,
                    end?.columnIndex,
                ),
            };
        },
        [datatableStore],
    );
};

export default useNormalizeSelectionHandler;
