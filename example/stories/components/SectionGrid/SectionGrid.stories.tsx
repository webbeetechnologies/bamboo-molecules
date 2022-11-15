import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Text } from 'react-native';
import { ProvideMolecules } from '../../common';

import { Example } from './SectionGrid';

export default {
    title: 'components/SectionGrid',
    component: Example,
    decorators: [
        Story => (
            <ProvideMolecules>
                <Story />
            </ProvideMolecules>
        ),
    ],
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    maxItemsPerRow: 3,
    sections: [
        {
            title: 'Numbers',
            data: ['1', '2', '3', '4', '5', '6'],
        },
        {
            title: 'Alphabets',
            data: ['A', 'B', 'C', 'D', 'E'],
        },
    ],
    renderItem: ({ item }: any) => <Text>{item}</Text>,
    renderSectionHeader: ({ section }) => <Text style={{ fontSize: 20 }}>{section.title}</Text>,
};

Default.parameters = {
    docs: {
        source: {
            code: `
<SectionGrid {...props} itemDimension={130} data={[
        {
            title: 'Numbers',
            data: ['1', '2', '3', '4', '5', '6'],
        },
        {
            title: 'Alphabets',
            data: ['A', 'B', 'C', 'D', 'E'],
        },
    ]} 
    renderItem={({ item }: any) => <Text>{item}</Text>}
    renderSectionHeader={({ section }) => <Text style={{ fontSize: 20 }}>{section.title}</Text>}
    />`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
