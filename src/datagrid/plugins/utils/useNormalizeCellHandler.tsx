import { useDataTableStoreRef } from '@bambooapp/bamboo-molecules/components';
import { useCallback } from 'react';

const useNormalizeCellHandler = () => {
    const { store: datatableStore } = useDataTableStoreRef();

    return useCallback(
        ({ columnIndex, rowIndex }: { columnIndex: number; rowIndex: number }) => {
            return {
                columnIndex,
                rowIndex,
                rowId: datatableStore.current.records[rowIndex],
                columnId: datatableStore.current.columns[columnIndex],
            };
        },
        [datatableStore],
    );
};

export default useNormalizeCellHandler;
