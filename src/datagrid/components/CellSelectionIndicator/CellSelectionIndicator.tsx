import { memo, useMemo } from 'react';
import {
    StateLayerProps,
    useDataTableCell,
    useDataTableRow,
    useMolecules,
} from '@bambooapp/bamboo-molecules';
import { StyleSheet } from 'react-native';
import { useDragAndExtendMethods, useCellSelectionMethods } from '../../plugins';

export type Props = StateLayerProps & {
    hovered: boolean;
};

const useVoid = () => {};
const useBoolean = () => false;

const CellSelectionIndicator = ({ hovered, style, ...rest }: Props) => {
    const { StateLayer } = useMolecules();

    const { columnIndex, rowIndex, row, column } = useDataTableCell();

    const { hovered: rowHovered } = useDataTableRow();

    const { useOnDragSelection = useVoid, useHasDragAndExtendSelection = useBoolean } =
        useDragAndExtendMethods() || {};
    const { useProcessDragCellSelection = useVoid, useHasCellSelection = useBoolean } =
        useCellSelectionMethods() || {};

    const selected = useHasCellSelection({ columnIndex, rowIndex });
    const dragAndExtendSelected = useHasDragAndExtendSelection({ columnIndex, rowIndex });

    useProcessDragCellSelection({
        hovered,
        cell: { columnIndex, rowIndex, rowId: row, columnId: column },
    });

    useOnDragSelection({ hovered, rowHovered, columnIndex, rowIndex });

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
