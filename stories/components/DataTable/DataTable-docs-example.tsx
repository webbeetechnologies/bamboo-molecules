import { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useMolecules, RenderHeaderCellProps, RenderCellProps } from '../../../src';
import { ProvideMolecules } from '../../common';
import keyBy from 'lodash.keyby';
import type { TDataTableRow } from '../../../src/components/DataTable/types';
/**
 * Modules for demonstration purposes.
 */

const columns = [
    { id: 'company', title: 'Company', type: 'list' },
    { id: 'name', title: 'Name', type: 'string' },
];

const records = [
    { id: 'row-1', name: 'Steve Jobs', company: ['Apple'] },
    { id: 'row-2', name: 'Bill Gates', company: ['Microsoft'] },
    { id: 'row-3', name: 'Sundar Pichai', company: ['Google'] },
    { id: 'row-4', name: 'Satya Nadela', company: ['Microsoft'] },
    { id: 'row-5', name: 'Elon Musk', company: ['Tesla', 'SpaceX'] },
    { id: 'row-6', name: 'Tim Cook', company: ['Apple'] },
];

const columnsMap = keyBy(columns, 'id');
const recordsMap = keyBy(records, 'id');

const getColumn = (column: keyof typeof columnsMap) => columnsMap[column];
const getRow = (row: TDataTableRow) => recordsMap[row] as typeof records[number];

const styles = StyleSheet.create({
    dataRow: { alignItems: 'center' },
    list: { flexDirection: 'row' as 'row', gap: 5 },
});

const ListRenderer = memo(({ data }: { data: string[] }) => {
    const { Chip, View } = useMolecules();
    return (
        <View style={styles.list}>
            {data.map(item => (
                <Chip.Suggestion key={item} label={item} size="sm" />
            ))}
        </View>
    );
});

const NameRenderer = memo(({ data }: { data: string }) => {
    const { H5 } = useMolecules();
    return <H5>{data}</H5>;
});

const columnTypes = {
    list: ListRenderer,
    string: NameRenderer,
} as const;

const renderCell = ({ column, row }: RenderCellProps) => {
    const ColumnRenderer = columnTypes[getColumn(column).type as keyof typeof columnTypes];
    return (
        <ColumnRenderer
            data={getRow(row)[column as keyof typeof records[number]] as string & string[]}
        />
    );
};

const HeaderCell = ({ column }: RenderHeaderCellProps) => {
    const { Text } = useMolecules();
    return <Text>{getColumn(column).title}</Text>;
};

const renderHeader = (props: RenderHeaderCellProps) => {
    return <HeaderCell {...props} />;
};

const tableRowProps = {
    style: styles.dataRow,
};
const TableRenderer = () => {
    const { DataTable } = useMolecules();

    const records = useMemo(() => Object.keys(recordsMap), []);
    const columns = useMemo(() => Object.keys(columnsMap), []);

    const props = {
        renderCell,
        renderHeader,
        columns,
        records,
    };

    return <DataTable {...props} rowProps={tableRowProps} />;
};

export default memo(() => (
    <ProvideMolecules>
        <TableRenderer />
    </ProvideMolecules>
));
