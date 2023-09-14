import { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useComponentStyles, useMolecules } from '@bambooapp/bamboo-molecules';
import {
    useDataTable,
    renderDataTableHeaderCell,
    DataTableHeaderCellContextProvider,
} from '@bambooapp/bamboo-molecules/components';
import { useShortcut } from '@bambooapp/bamboo-molecules/shortcuts-manager';

import { useHandleClickOutside, useHandleKeydownEvents } from '../../hooks';
import { useTableManagerStoreRef } from '../../contexts';
import { useCellFocusMethods } from '../../plugins';

export const TableHeaderRow = memo(() => {
    const { View } = useMolecules();
    const { store: storeRef } = useTableManagerStoreRef();
    const { useResetFocusCellState } = useCellFocusMethods();
    const resetFocusCellState = useResetFocusCellState();

    const { columns, headerRowProps, horizontalOffset } = useDataTable(store => ({
        columns: store.columns || [],
        headerRowProps: store.headerRowProps,
        horizontalOffset: store.horizontalOffset,
    }));
    const { useEnsureCorrectFocusCellState, useSetFocusCellByDirection } = useCellFocusMethods();
    const setFocusCellByDirection = useSetFocusCellByDirection();

    const headerStyle = useComponentStyles('DataTable_HeaderRow', [
        { paddingHorizontal: horizontalOffset },
        styles.headerRow,
        headerRowProps?.style,
        { flexDirection: 'row' },
    ]);

    const cells = useMemo(
        () =>
            columns.map((item, i, self) => (
                <DataTableHeaderCellContextProvider
                    column={item}
                    columnIndex={i}
                    isFirst={i === 0}
                    isLast={self.length - 1 === i}
                    key={i}>
                    {renderDataTableHeaderCell({ item, index: i })}
                </DataTableHeaderCellContextProvider>
            )),
        [columns],
    );

    useHandleKeydownEvents({ ref: storeRef.current.tableRef });
    useHandleClickOutside();
    useEnsureCorrectFocusCellState();

    useShortcut('arrow', ({ key, pressedKeys, normalizedKey }) => {
        if (normalizedKey.includes('tab')) {
            setFocusCellByDirection(normalizedKey.includes('shift') ? 'left' : 'right');

            return;
        }

        setFocusCellByDirection(
            key.split('Arrow')[1].toLowerCase(),
            pressedKeys.includes('meta') || pressedKeys.includes('control'),
        );
    });

    useShortcut('clear-cell-focus', () => {
        resetFocusCellState();
    });

    return (
        <View {...headerRowProps} style={headerStyle}>
            {cells}
        </View>
    );
});

const styles = StyleSheet.create({
    headerRow: {
        borderWidth: 1,
        borderColor: 'colors.outlineVariant',
    },
});
