import { memo, useMemo } from 'react';
import {
    StateLayerProps,
    useDataTableCell,
    useDataTableRow,
    useMolecules,
} from '@bambooapp/bamboo-molecules';
import { StyleSheet } from 'react-native';
import {
    cellSelectionPluginKey,
    Selection,
    usePluginsDataValueSelectorValue,
    dragAndExtendKey,
    useDragAndExtendMethods,
} from '../../plugins';

export type Props = StateLayerProps & {
    hovered: boolean;
};

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

const useVoid = () => {};

const CellSelectionIndicator = ({ hovered, style, ...rest }: Props) => {
    const { StateLayer } = useMolecules();

    const { columnIndex, rowIndex } = useDataTableCell();

    const { hovered: rowHovered } = useDataTableRow();

    const { useOnDragSelection = useVoid } = useDragAndExtendMethods() || {};

    const selected = usePluginsDataValueSelectorValue(store =>
        checkSelection(store[cellSelectionPluginKey], {
            columnIndex,
            rowIndex,
        }),
    );
    const dragAndExtendSelected = usePluginsDataValueSelectorValue(store =>
        checkSelection(store[dragAndExtendKey], {
            columnIndex,
            rowIndex,
        }),
    );

    useOnDragSelection({ checkSelection, hovered, rowHovered, columnIndex, rowIndex });

    const layerStyle = useMemo(
        () => [
            styles.selectionLayer,
            dragAndExtendSelected && { backgroundColor: 'colors.stateLayer.hover.onSurface' },
            style,
        ],
        [dragAndExtendSelected, style],
    );

    if (!selected && !dragAndExtendSelected) return <></>;

    return <StateLayer style={layerStyle} {...rest} />;
};

const styles = StyleSheet.create({
    selectionLayer: {
        backgroundColor: 'colors.stateLayer.hover.primary',
    },
});

export default memo(CellSelectionIndicator);
