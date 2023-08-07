import { normalizeSelectionHandler } from '../useNormalizeSelection';
import type { CellIndexes } from '../../cell-selection';

const records = ['record-1', 'record-2', 'record-3', 'record-4', 'record-5'];
const columns = ['column-1', 'column-2', 'column-3', 'column-4', 'column-5'];

describe('normalizeSelectionHandler', () => {
    it('should return correct columnIds and recordIs for given selection indexes', function () {
        const startIndexes: CellIndexes = {
            columnIndex: 2,
            rowIndex: 1,
        };
        const endIndexes: CellIndexes = {
            columnIndex: 4,
            rowIndex: 4,
        };
        const expectedSelection = {
            start: startIndexes,
            end: endIndexes,
            recordIds: ['record-2', 'record-3', 'record-4', 'record-5'],
            columnIds: ['column-3', 'column-4', 'column-5'],
        };

        const returnedSelection = normalizeSelectionHandler({
            start: startIndexes,
            end: endIndexes,
            records,
            columns,
        });

        expect(returnedSelection.recordIds).toEqual(
            expect.arrayContaining(expectedSelection.recordIds),
        );
        expect(returnedSelection.columnIds).toEqual(
            expect.arrayContaining(expectedSelection.columnIds),
        );
        expect(returnedSelection.start).toBe(expectedSelection.start);
        expect(returnedSelection.end).toBe(expectedSelection.end);
    });

    it('should still return correct range even though some of the indexes are not there in the records and columns', function () {
        const startIndexes: CellIndexes = {
            columnIndex: 4,
            rowIndex: 2,
        };
        const endIndexes: CellIndexes = {
            columnIndex: 6,
            rowIndex: 6,
        };
        const expectedSelection = {
            start: startIndexes,
            end: endIndexes,
            recordIds: ['record-3', 'record-4', 'record-5'],
            columnIds: ['column-5'],
        };

        const returnedSelection = normalizeSelectionHandler({
            start: startIndexes,
            end: endIndexes,
            records,
            columns,
        });

        expect(returnedSelection.recordIds).toEqual(
            expect.arrayContaining(expectedSelection.recordIds),
        );
        expect(returnedSelection.columnIds).toEqual(
            expect.arrayContaining(expectedSelection.columnIds),
        );
        expect(returnedSelection.start).toBe(expectedSelection.start);
        expect(returnedSelection.end).toBe(expectedSelection.end);
    });
});
