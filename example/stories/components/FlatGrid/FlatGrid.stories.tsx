import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { View, Text } from 'react-native';
import { ProvideMolecules } from '../../common';

import { Example } from './FlatGrid';

export default {
    title: 'components/FlatGrid',
    component: Example,
    decorators: [
        Story => (
            <ProvideMolecules>
                <Story />
            </ProvideMolecules>
        ),
    ],
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => (
    <View style={{ minWidth: 300 }}>
        <Example {...args} />
    </View>
);

Default.args = {
    itemDimension: 130,
    data: [
        {
            text: 'A',
        },
        {
            text: 'B',
        },
        {
            text: 'C',
        },
        {
            text: 'D',
        },
        {
            text: 'E',
        },
        {
            text: 'D',
        },
    ],
    renderItem: ({ item }: any) => <Text>{item.text}</Text>,
};

Default.parameters = {
    docs: {
        source: {
            code: `
<FlatGrid {...props} itemDimension={130} data={[
        {
            text: 'A',
        },
        {
            text: 'B',
        },
        {
            text: 'C',
        },
        {
            text: 'D',
        },
        {
            text: 'E',
        },
        {
            text: 'D',
        },
    ]} renderItem={({ item }: any) => <Text>{item}</Text>} />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
