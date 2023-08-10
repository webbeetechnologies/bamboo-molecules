import checkSelection from '../checkSelection';
import type { SelectionIndexes } from '../../types';
import type { CellIndexes } from '../../cell-selection';

const selection: SelectionIndexes = {
    start: {
        columnIndex: 2,
        rowIndex: 1,
    },
    end: {
        columnIndex: 4,
        rowIndex: 5,
    },
};

describe('checkSelection', () => {
    it('should return true if the cell is within the selection', () => {
        const cell: CellIndexes = {
            columnIndex: 2,
            rowIndex: 3,
        };

        const isInSelection = checkSelection(selection, cell);

        expect(isInSelection).toBe(true);
    });
    it('should return true if the cell is within the selection even if start and end are reversed', () => {
        const cell: CellIndexes = {
            columnIndex: 2,
            rowIndex: 3,
        };

        const isInSelection = checkSelection({ start: selection.end, end: selection.start }, cell);

        expect(isInSelection).toBe(true);
    });

    it('should return false if the cell is not within the selection', () => {
        const cell: CellIndexes = {
            columnIndex: 5,
            rowIndex: 3,
        };

        const isInSelection = checkSelection(selection, cell);

        expect(isInSelection).toBe(false);
    });

    it('should return true if the cell is the same as the start selection', () => {
        const isInSelection = checkSelection(selection, selection.start);

        expect(isInSelection).toBe(true);
    });
    it('should return true if the cell is the same as the end selection', () => {
        const isInSelection = checkSelection(selection, selection.end);

        expect(isInSelection).toBe(true);
    });
});
