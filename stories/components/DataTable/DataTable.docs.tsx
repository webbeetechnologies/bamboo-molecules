import { useMolecules, withDocsWrapper } from '../../common';
import { Source } from '@storybook/addon-docs';

const DocsPage = () => {
    const { View, H1, H2, H3, Text, Code } = useMolecules();

    return (
        <View>
            <H1>DataTable</H1>
            <Text>
                DataTable can be used to create a table from table-able data. It is a wrapper
                component that uses <Code>FlatList</Code> and <Code>ScrollView</Code> to render rows
                and columns.
            </Text>
            <H2>Props</H2>
            <Text>
                The DataTable component accepts a rows and columns with the following properties:{' '}
                {'\n'}
            </Text>
            <H3>
                <Code>records</Code>
            </H3>
            <Text>
                The records prop is an array of objects that represent a row in the table. Each
                object in the array may have the following properties: {'\n\n'}
                <Code>id</Code> - An string id of a row.
            </Text>
            <H3>
                <Code>columns</Code>
            </H3>
            <Text>
                The columns prop is an array of objects that represent a column in the table. Each
                object in the array may have the following properties: {'\n\n'}
                <Code>id</Code> - An string id of the column.
            </Text>
            <H3>
                <Code>defaultColumnWidth</Code>
            </H3>
            <Text>
                To overwrite the default width for the table columns
                {'\n'}
            </Text>
            <H3>
                <Code>renderCell</Code>
            </H3>
            <Text>
                A function that returns a ReactNode. The function gets the following arguments{' '}
                {'\n\n'}
                <Code>row</Code> - A record in the table. {'\n\n'}
                <Code>column</Code> - The column this cell belongs to. {'\n\n'}
                <Code>rowIndex</Code> - index of the row {'\n\n'}
                <Code>columnIndex</Code> - index of the column {'\n'}
            </Text>
            <H3>
                <Code>renderHeader</Code>
            </H3>
            <Text>
                A function that returns a ReactNode. The function gets the following arguments{' '}
                {'\n\n'}
                <Code>column</Code> - The column this cell belongs to. {'\n\n'}
                <Code>columnIndex</Code> - index of the column {'\n'}
            </Text>
            <H3>
                <Code>rowProps</Code>
                <Code>cellProps</Code>
                <Code>headerRowProps</Code>
                <Code>headerCellProps</Code>
                <Code>horizontalScrollProps</Code>
                <Code>verticalScrollProps</Code>
            </H3>
            <Text>
                Props to modify the behavior of the underlying components.
                {'\n'}
            </Text>

            <H3>
                <Code>FlatListComponent</Code>
            </H3>
            <Text>
                Used for vertical scrolling, Can be used to replace the virtualized scroll component
                {'\n'}
            </Text>
            <H3>
                <Code>ScrollViewComponent</Code>
            </H3>
            <Text>
                Used for horizontal scrolling, Can be used to replace the ScrollView component
                {'\n'}
            </Text>

            <H2>Usage</H2>
            <Text>
                Create the <Code>renderer</Code> function that will be passed to the{' '}
                <Code>Grid</Code> component. For example:
                <Source language="tsx" code={firstCodeBlock} />
            </Text>
        </View>
    );
};

const firstCodeBlock = `
import { memo, useMemo } from 'react';
import { useMolecules, DataTableProps, RenderHeaderCellProps, RenderCellProps } from '../../../src';

/**
 * Modules for demonstration purposes.
 */

export const DataTableComponent = (props: DataTableProps) => {
    const { DataTable } = useMolecules();
    return <DataTable {...props} />;
};

const ListRenderer = memo(({ data }: { data: string[] }) => {
    const { Text, View } = useMolecules();
    const viewStyles = useMemo(() => ({ flexDirection: 'row' as 'row', gap: 5 }), []);
    return (
        <View style={viewStyles}>
            {data.map(item => (
                <Text>{item}</Text>
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

const TableRenderer = () => {
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

    return <DataTableComponent {...props} />;
};

export default memo(TableRenderer);
`;

export default withDocsWrapper(DocsPage);
