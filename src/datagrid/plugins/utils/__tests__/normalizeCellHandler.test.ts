import { normalizeCellHandler } from '../useNormalizeCellHandler';
import type { CellIndexes } from '../../cell-selection';

const records = ['record-1', 'record-2', 'record-3', 'record-4', 'record-5'];
const columns = ['column-1', 'column-2', 'column-3', 'column-4', 'column-5'];

describe('normalizeCellHandler', () => {
    it('should return correct ids for give column and row indexes', function () {
        const selectionIndexes: CellIndexes = {
            columnIndex: 2,
            rowIndex: 1,
        };
        const expectedSelection = {
            ...selectionIndexes,
            rowId: records[selectionIndexes.rowIndex],
            columnId: columns[selectionIndexes.columnIndex],
        };

        const returnedSelection = normalizeCellHandler({ ...selectionIndexes, columns, records });

        expect(returnedSelection.rowId).toBe(expectedSelection.rowId);
        expect(returnedSelection.columnId).toBe(expectedSelection.columnId);
        expect(returnedSelection.rowIndex).toBe(expectedSelection.rowIndex);
        expect(returnedSelection.columnIndex).toBe(expectedSelection.columnIndex);
    });
});
