import { memo, useCallback } from 'react';
import type { ViewProps } from 'react-native';
import type { GridProps } from '../../../src/components';
import { useMolecules } from '../../../src/hooks';

export type Props = {
    /**
     * Name of module or field to be rendered.
     */
    name: string;
};

/**
 * Modules for demonstration purposes.
 */

export const Grid = (props: GridProps) => {
    const { Grid } = useMolecules();
    return <Grid {...props} />;
};

const Card = ({
    title,
    subheading,
    style,
}: ViewProps & {
    title: string;
    subheading: string;
    description: string;
    withActions?: boolean;
}) => {
    const { Card, View } = useMolecules();
    return (
        <View style={style}>
            <Card>
                <Card.Content>
                    <Card.Headline>{title}</Card.Headline>
                    <Card.Subhead>{subheading}</Card.Subhead>
                    <Card.Text>
                        Explain more about the topic shown and headline subhead through supporting
                        text
                    </Card.Text>
                </Card.Content>
            </Card>
        </View>
    );
};

const keyExtractor = (item: { title: string; value: string }) => item.title;

const Table = ({ style, data }: ViewProps & { data: { title: string; value: string }[] }) => {
    const { View, Card, FlatList, Text } = useMolecules();
    const renderItem = useCallback(
        ({ item }: { item: { title: string; value: string } }) => (
            <View>
                <Text>{item.title}</Text>
                <Text>{item.value}</Text>
            </View>
        ),
        [],
    );
    return (
        <Card style={style}>
            <FlatList
                data={data}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                numColumns={6}
            />
        </Card>
    );
};

const componentType = {
    grid: Grid,
    table: Table,
    card: Card,
};

const GridRenderer = ({ name }: Props) => {
    const { type, ...props } = fieldData[name as keyof typeof fieldData];
    const Component: any = componentType[type as keyof typeof componentType];
    if (!Component) throw new Error(`Component ${name} not found.`);
    return <Component {...props} />;
};

const fieldData = {
    table1: {
        type: 'table',
        data: [
            { title: 'Title 1', value: 'Value 1' },
            { title: 'Title 2', value: 'Value 2' },
            { title: 'Title 3', value: 'Value 3' },
            { title: 'Title 4', value: 'Value 4' },
            { title: 'Title 5', value: 'Value 5' },
            { title: 'Title 6', value: 'Value 6' },
        ],
        style: { marginHorizontal: 10, padding: 10 },
    },
    card1: {
        type: 'card',
        title: 'Card 1',
        subheading: 'Card 1 subheading',
        style: { padding: 10 },
    },
    card2: {
        type: 'card',
        title: 'Card 2',
        subheading: 'Card 2 subheading',
        style: { padding: 10 },
    },
    card3: {
        type: 'card',
        title: 'Card 3',
        subheading: 'Card 3 subheading',
        style: { padding: 10 },
    },
    grid1: {
        type: 'grid',
        data: [
            {
                name: 'table1',
                breakpoints: 12,
            },
        ],
        renderer: GridRenderer,
        style: { marginVertical: 20 },
    },
    grid2: {
        type: 'grid',
        data: [
            {
                name: 'card1',
                breakpoints: {
                    md: 4,
                    sm: 6,
                },
            },
            {
                name: 'card2',
                breakpoints: {
                    md: 4,
                    sm: 6,
                },
            },
            {
                name: 'card3',
                breakpoints: {
                    md: 4,
                    sm: 6,
                },
            },
        ],
        renderer: GridRenderer,
    },
};

export default memo(GridRenderer);
