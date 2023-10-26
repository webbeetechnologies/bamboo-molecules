import type { GroupedData } from '../../../utils';
import type { CellIndices } from '../../types';
import { normalizeSelectionHandler } from '../useNormalizeSelection';

const columnIds = ['column-1', 'column-2', 'column-3', 'column-4', 'column-5'];

const records = [
    { id: 'record-1' },
    { id: 'record-2' },
    { id: 'record-3' },
    { id: 'record-4' },
    { id: 'record-5' },
] as GroupedData[];

describe('normalizeSelectionHandler', () => {
    it('should return correct columnIds and recordIs for given selection indexes', function () {
        const startIndexes: CellIndices = {
            columnIndex: 2,
            rowIndex: 1,
        };
        const endIndexes: CellIndices = {
            columnIndex: 4,
            rowIndex: 4,
        };

        const expectedSelection = {
            start: startIndexes,
            end: endIndexes,
            columnIds: ['column-3', 'column-4', 'column-5'],
            records: records.slice(1, 4),
            startRecord: records.at(1),
            endRecord: records.at(4),
        };

        const returnedSelection = normalizeSelectionHandler({
            start: startIndexes,
            end: endIndexes,
            columnIds,
            records,
        });

        expect(returnedSelection.columnIds).toEqual(
            expect.arrayContaining(expectedSelection.columnIds),
        );
        expect(returnedSelection.start).toBe(expectedSelection.start);
        expect(returnedSelection.end).toBe(expectedSelection.end);
        expect(returnedSelection.startRecord).toBe(expectedSelection.startRecord);
        expect(returnedSelection.endRecord).toBe(expectedSelection.endRecord);
    });

    it('should still return correct range even though some of the indexes are not there in the records and columns', function () {
        const startIndexes: CellIndices = {
            columnIndex: 4,
            rowIndex: 2,
        };
        const endIndexes: CellIndices = {
            columnIndex: 6,
            rowIndex: 6,
        };
        const expectedSelection = {
            start: startIndexes,
            end: endIndexes,
            columnIds: ['column-5'],
            startRecord: records.at(2),
            endRecord: records.at(4),
            records: records.slice(2, 4),
        };

        const returnedSelection = normalizeSelectionHandler({
            start: startIndexes,
            end: endIndexes,
            columnIds,
            records,
        });

        expect(returnedSelection.columnIds).toEqual(
            expect.arrayContaining(expectedSelection.columnIds),
        );
        expect(returnedSelection.start).toBe(expectedSelection.start);
        expect(returnedSelection.end).toBe(expectedSelection.end);
        expect(returnedSelection.startRecord).toBe(expectedSelection.startRecord);
        expect(returnedSelection.endRecord).toBe(expectedSelection.endRecord);
    });
});
