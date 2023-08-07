import { memo, useMemo } from 'react';
import { useComponentStyles, useMolecules } from '@bambooapp/bamboo-molecules';
import {
    useDataTable,
    renderDataTableHeaderCell,
    DataTableHeaderCellContextProvider,
} from '@bambooapp/bamboo-molecules/components';
import { StyleSheet } from 'react-native';
import { useHandleKeydownEvents } from '../../hooks';
import { useTableManagerStoreRef } from '../../contexts';

export const TableHeaderRow = memo(() => {
    const { View } = useMolecules();
    const { store: storeRef } = useTableManagerStoreRef();

    const { columns, headerRowProps, horizontalOffset } = useDataTable(store => ({
        columns: store.columns || [],
        headerRowProps: store.headerRowProps,
        horizontalOffset: store.horizontalOffset,
    }));

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

    // TODO - move this to plugins
    useHandleKeydownEvents({ ref: storeRef.current.tableRef });

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
