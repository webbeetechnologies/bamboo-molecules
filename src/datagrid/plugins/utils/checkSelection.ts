import type { Selection } from '../types';

const checkSelection = (selection: Selection, cell: { columnIndex: number; rowIndex: number }) => {
    const { rowIndex, columnIndex } = cell;

    if (!selection || !selection.start || !selection.end) return false;

    const { start, end } = selection;
    const { startRowIndex, endRowIndex } =
        start.rowIndex <= end.rowIndex
            ? { startRowIndex: start.rowIndex, endRowIndex: end.rowIndex }
            : { startRowIndex: end.rowIndex, endRowIndex: start.rowIndex };
    const { startColumnIndex, endColumnIndex } =
        start.columnIndex <= end.columnIndex
            ? { startColumnIndex: start.columnIndex, endColumnIndex: end.columnIndex }
            : { startColumnIndex: end.columnIndex, endColumnIndex: start.columnIndex };

    return (
        rowIndex >= startRowIndex &&
        rowIndex <= endRowIndex &&
        columnIndex >= startColumnIndex &&
        columnIndex <= endColumnIndex
    );
};

export default checkSelection;
