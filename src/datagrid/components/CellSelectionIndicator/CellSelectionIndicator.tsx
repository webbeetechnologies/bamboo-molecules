import { memo } from 'react';
import { StateLayerProps, useMolecules } from '@bambooapp/bamboo-molecules';
import { StyleSheet } from 'react-native';
import { cellSelectionPluginKey, usePluginsDataValueSelectorValue } from '../../plugins';

export type Props = StateLayerProps & {
    columnIndex: number;
    rowIndex: number;
};

const CellSelectionIndicator = ({ columnIndex, rowIndex, ...rest }: Props) => {
    const { StateLayer } = useMolecules();
    const selected = usePluginsDataValueSelectorValue(store => {
        const selection = store[cellSelectionPluginKey];

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
    });

    if (!selected) return <></>;

    return <StateLayer style={styles.selectionLayer} {...rest} />;
};

const styles = StyleSheet.create({
    selectionLayer: {
        backgroundColor: 'colors.stateLayer.hover.primary',
    },
});

export default memo(CellSelectionIndicator);
