import { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useMolecules, RenderHeaderCellProps, RenderCellProps } from '../../../src';
import { ProvideMolecules } from '../../common';

/**
 * Modules for demonstration purposes.
 */

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
    const ColumnRenderer = columnTypes[column.type as keyof typeof columnTypes];
    return <ColumnRenderer data={row[column.id]} />;
};

const HeaderCell = ({ column }: RenderHeaderCellProps) => {
    const { Text } = useMolecules();
    return <Text>{column.title}</Text>;
};

const renderHeader = (props: RenderHeaderCellProps) => {
    return <HeaderCell {...props} />;
};

const tableRowProps = {
    style: styles.dataRow,
};
const TableRenderer = () => {
    const { DataTable } = useMolecules();

    const records = useMemo(
        () => [
            { id: 'row-1', name: 'Steve Jobs', company: ['Apple'] },
            { id: 'row-2', name: 'Bill Gates', company: ['Microsoft'] },
            { id: 'row-3', name: 'Sundar Pichai', company: ['Google'] },
            { id: 'row-4', name: 'Satya Nadela', company: ['Microsoft'] },
            { id: 'row-5', name: 'Elon Musk', company: ['Tesla', 'SpaceX'] },
            { id: 'row-6', name: 'Tim Cook', company: ['Apple'] },
        ],
        [],
    );

    const columns = useMemo(
        () => [
            { id: 'company', title: 'Company', type: 'list' },
            { id: 'name', title: 'Name', type: 'string' },
        ],
        [],
    );

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
