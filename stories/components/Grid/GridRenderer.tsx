import { memo } from 'react';
import type { ViewProps } from 'react-native';
import { useMolecules } from '../../../src/hooks';
import Grid from '../../../src/components/Grid/Grid';

export type Props = {
    /**
     * Name of module or field to be rendered.
     */
    name: string;
};

// Just a placeholder for a Text component.
const Text = ({ children, style }: ViewProps) => {
    const { Text, View } = useMolecules();
    return (
        <View style={style}>
            <Text>{children}</Text>
        </View>
    );
};

const componentType = {
    grid: Grid,
    text: Text,
};

const GridRenderer = ({ name }: Props) => {
    const { type, ...props } = fieldData[name as keyof typeof fieldData];
    const Component: any = componentType[type as keyof typeof componentType];
    if (!Component) throw new Error(`Component ${name} not found.`);
    return <Component {...props} />;
};

const fieldData = {
    field1: {
        type: 'text',
        children: 'Some text 1',
        style: { backgroundColor: 'blue' },
    },
    field2: {
        type: 'text',
        children: 'Some text 2',
        style: { backgroundColor: 'lightblue' },
    },
    field3: {
        type: 'text',
        children: 'Some text 3',
        style: { backgroundColor: 'green' },
    },
    grid1: {
        type: 'grid',
        data: [
            {
                name: 'field1',
                breakPoints: {
                    md: 4,
                    sm: 6,
                    xs: 3,
                },
            },
            {
                name: 'field2',
                breakPoints: {
                    md: 4,
                    sm: 6,
                },
            },
            {
                name: 'grid2',
                breakPoints: {
                    md: 4,
                },
            },
        ],
        renderer: GridRenderer,
        style: { backgroundColor: 'pink' },
    },
    grid2: {
        type: 'grid',
        data: [
            {
                name: 'field1',
                breakPoints: {
                    md: 4,
                    sm: 6,
                    xs: 3,
                },
            },
            {
                name: 'field2',
                breakPoints: {
                    md: 4,
                    sm: 6,
                },
            },
            {
                name: 'field3',
                breakPoints: {
                    md: 4,
                    sm: 6,
                },
            },
        ],
        renderer: GridRenderer,
        style: { backgroundColor: 'red' },
    },
};

export default memo(GridRenderer);
