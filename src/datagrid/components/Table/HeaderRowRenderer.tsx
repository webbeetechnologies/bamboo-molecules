import { Fragment, memo, useMemo } from 'react';
import { useComponentStyles, useMolecules } from '@bambooapp/bamboo-molecules';
import { useDataTable, renderDataTableHeaderCell } from '@bambooapp/bamboo-molecules/components';

export const TableHeaderRow = memo(() => {
    const { View } = useMolecules();

    const { columns, headerRowProps } = useDataTable(store => ({
        columns: store.columns || [],
        headerRowProps: store.headerRowProps,
    }));

    const headerStyle = useComponentStyles('DataTable_HeaderRow', [
        headerRowProps?.style,
        {
            flexDirection: 'row',
        },
    ]);

    const cells = useMemo(
        () =>
            columns.map((item, i) => (
                <Fragment key={item}>{renderDataTableHeaderCell({ item, index: i })}</Fragment>
            )),
        [columns],
    );

    return (
        <View {...headerRowProps} style={headerStyle}>
            {cells}
        </View>
    );
});
