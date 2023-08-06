import { Fragment, memo, useMemo } from 'react';
import { useComponentStyles, useMolecules } from '@bambooapp/bamboo-molecules';
import { useDataTable, renderDataTableHeaderCell } from '@bambooapp/bamboo-molecules/components';
import { StyleSheet } from 'react-native';
import { useHandleKeydownEvents } from '../../hooks';
import { useTableManagerStoreRef } from '../../contexts';

export const TableHeaderRow = memo(() => {
    const { View } = useMolecules();
    const { store } = useTableManagerStoreRef();

    const { columns, headerRowProps } = useDataTable(store => ({
        columns: store.columns || [],
        headerRowProps: store.headerRowProps,
    }));

    const headerStyle = useComponentStyles('DataTable_HeaderRow', [
        styles.headerRow,
        headerRowProps?.style,
        { flexDirection: 'row' },
    ]);

    const cells = useMemo(
        () =>
            columns.map((item, i) => (
                <Fragment key={item}>{renderDataTableHeaderCell({ item, index: i })}</Fragment>
            )),
        [columns],
    );

    // TODO - move this to plugins
    useHandleKeydownEvents({ ref: store.current.tableRef });

    return (
        <View {...headerRowProps} style={headerStyle}>
            {cells}
        </View>
    );
});

const styles = StyleSheet.create({
    headerRow: {
        borderBottomWidth: 1,
        borderBottomColor: 'colors.outlineVariant',
    },
});
