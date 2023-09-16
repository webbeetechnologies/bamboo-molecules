import { TDataTableColumn, TDataTableRow, useDataTable } from '@bambooapp/bamboo-molecules';
import { useEffect, useMemo } from 'react';
import {
    CELL_FOCUS_PLUGIN_KEY,
    usePluginsDataValueSelector,
} from '@bambooapp/bamboo-molecules/datagrid';

import { useResetFocusCellState } from './useSetFocusCellPluginStore';

export const useEnsureCorrectFocusCellState = () => {
    const { recordIds, columnIds } = useDataTable(state => ({
        recordIds: state.records,
        columnIds: state.columns,
    }));

    const { recordsMap, columnsMap } = useMemo(
        () => ({
            recordsMap: recordIds.reduce((acc: Record<TDataTableRow, true>, recordId) => {
                acc[recordId] = true;

                return acc;
            }, {}),
            columnsMap: columnIds.reduce((acc: Record<TDataTableColumn, true>, columnId) => {
                acc[columnId] = true;

                return acc;
            }, {}),
        }),
        [columnIds, recordIds],
    );

    const resetFocusState = useResetFocusCellState();
    const isFocusedCellStateCorrect = usePluginsDataValueSelector(state => {
        const { columnId, rowId } = state[CELL_FOCUS_PLUGIN_KEY]?.focusedCell || {};

        return columnsMap[columnId] && recordsMap[rowId];
    });

    useEffect(() => {
        if (isFocusedCellStateCorrect) return;

        resetFocusState();
    }, [isFocusedCellStateCorrect, resetFocusState]);
};
