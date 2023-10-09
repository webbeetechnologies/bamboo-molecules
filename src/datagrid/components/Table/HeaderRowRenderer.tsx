import { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useComponentStyles, useMolecules } from '@bambooapp/bamboo-molecules';
import {
    useDataTable,
    renderDataTableHeaderCell,
    DataTableHeaderCellContextProvider,
} from '@bambooapp/bamboo-molecules/components';

import { useDatagridMethods } from '../../hooks';

export const TableHeaderRow = memo(() => {
    const { View } = useMolecules();

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

    useDatagridMethods();

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
