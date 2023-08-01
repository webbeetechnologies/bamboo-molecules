import { StateLayerProps, useMolecules } from '@bambooapp/bamboo-molecules';
import { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';

export type Props = StateLayerProps & {
    isFocused: boolean;
    columnIndex: number;
    rowIndex: number;
};

const CellBorder = ({ style, isFocused, columnIndex, ...rest }: Props) => {
    const { StateLayer } = useMolecules();

    const borderStyle = useMemo(
        () => [
            styles.border,
            columnIndex === 0 && { borderLeftWidth: 1 },
            isFocused && styles.focused,
            style,
        ],
        [columnIndex, isFocused, style],
    );

    return <StateLayer style={borderStyle} {...rest} />;
};

const styles = StyleSheet.create({
    border: {
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'colors.outlineVariant',
    },
    focused: {
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderRadius: 2,
        borderColor: 'blue',
        backgroundColor: 'colors.surface',
    },
});

export default memo(CellBorder);
