import { useMolecules, withDocsWrapper } from '../../common';
import { Source, Canvas, Story } from '@storybook/addon-docs';
import { Example as Grid } from './Grid';
import GridRenderer from './GridRenderer';

const DocsPage = () => {
    const { View, H1, H2, H3, Text, Code } = useMolecules();

    return (
        <View>
            <H1>Grid</H1>
            <Text>
                Grid is a component that can be used to create a responsive grid layout. It is a
                wrapper component that uses <Code>FlatList</Code> to render the columns.
            </Text>
            <H2>Props</H2>
            <Text>
                The Grid component accepts a Configuration Object with the following properties:{' '}
                {'\n'}
            </Text>
            <H3>
                <Code>data</Code>
            </H3>
            <Text>
                The data prop is an array of objects that represent a column in the grid. Each
                object in the array may have the following properties: {'\n\n'}
                <Code>breakpoints</Code> - A number or an object that represents the number of
                columns that the column should span for each screen breakpoint. {'\n\n'}
                <Code>theme</Code> - An id of a theme that will be applied to the column. {'\n\n'}
                <Code>name</Code> - The name of the module or field to render. {'\n\n'}
                <Code>alignment</Code> - The alignment of the column.
            </Text>
            <H3>
                <Code>renderer</Code>
            </H3>
            <Text>
                The renderer is a component that will be used to render the module or field in each
                column. It accepts a single prop called <Code>name</Code> that represents the name
                of the module or field to render. {'\n\n'}
            </Text>
            <H3>
                <Code>numberOfColumns (optional)</Code>
            </H3>
            <Text>
                This prop represents the number of columns that will be rendered in the grid. If
                this prop is not provided, the grid will render 12 columns by default. {'\n\n'}
            </Text>
            <H3>
                <Code>referenceBreakpoints (optional)</Code>
            </H3>
            <Text>
                This prop represents the reference breakpoints for the grid in different screen
                sizes. If this prop is not provided, the grid will use the default reference
                breakpoints: {'\n\n'}
                <Code>xs</Code> - 320px {'\n'}
                <Code>sm</Code> - 576px {'\n'}
                <Code>md</Code> - 768px {'\n'}
                <Code>lg</Code> - 992px {'\n'}
                <Code>xl</Code> - 1200px {'\n\n'}
            </Text>

            <H2>Usage</H2>
            <Text>
                Create the <Code>renderer</Code> function that will be passed to the{' '}
                <Code>Grid</Code> component. For example:
                <Source language="tsx" code={firstCodeBlock} />
                Then, use the <Code>Grid</Code> component to render the grid layout:
                <Source language="tsx" code={secondCodeBlock} />
                And here's the result:
            </Text>
            <Story id="components-grid--default" />
        </View>
    );
};

const firstCodeBlock = `
import { memo, useCallback } from 'react';
import type { ViewProps } from 'react-native';
import type { GridProps } from '@bambooapp/bamboo-molecules';
import { useMolecules } from '@bambooapp/bamboo-molecules';

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
    if (!Component) throw new Error(${'Component ${name} not found.'});
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
`;

const secondCodeBlock = `
import { memo } from 'react';
import GridRenderer from './GridRenderer'; // The renderer function created in the previous step

export const ExampleGrid = memo((props: Props) => {
  return (
    <Grid  
      data={[
          {
              name: 'grid1',
              breakpoints: {
                  lg: 12,
              },
          },
          {
              name: 'grid2',
              breakpoints: {
                  lg: 12,
              },
          },
      ]},
      renderer={GridRenderer},

      // Optional props
      numberOfColumns: 12,
      referenceBreakpoints: {
          xs: 320,
          sm: 576,
          md: 768,
          lg: 992,
          xl: 1200,
    },
    />
  );
});
`;

export default withDocsWrapper(DocsPage);
