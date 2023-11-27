import { memo, useEffect, useMemo } from 'react';
import {
    StateLayerProps,
    useDataTableCell,
    useDataTableRow,
    useMolecules,
} from '@bambooapp/bamboo-molecules';
import { StyleSheet } from 'react-native';
import { useDragAndExtendMethods, useCellSelectionMethods } from '../../plugins';
import { cellEventsEmitter } from '../Table/utils';

export type Props = StateLayerProps & {
    hovered: boolean;
};

const useBoolean = () => false;

const CellSelectionIndicator = ({ hovered, style, ...rest }: Props) => {
    const { StateLayer } = useMolecules();

    const { columnIndex, rowIndex, row, column } = useDataTableCell();

    const { hovered: rowHovered } = useDataTableRow(store => ({ hovered: store.hovered }));

    const { useHasDragAndExtendSelection = useBoolean } = useDragAndExtendMethods() || {};
    const { useHasCellSelection = useBoolean } = useCellSelectionMethods() || {};

    const selected = useHasCellSelection({ columnIndex, rowIndex });
    const dragAndExtendSelected = useHasDragAndExtendSelection({ columnIndex, rowIndex });

    useEffect(() => {
        cellEventsEmitter.emit('onDragSelection', { hovered, rowHovered, columnIndex, rowIndex });
    }, [columnIndex, hovered, rowHovered, rowIndex]);

    useEffect(() => {
        cellEventsEmitter.emit('onProcessDragCellSelection', {
            hovered,
            cell: { columnIndex, rowIndex, rowId: row, columnId: column },
        });
    }, [column, columnIndex, hovered, row, rowHovered, rowIndex]);

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
