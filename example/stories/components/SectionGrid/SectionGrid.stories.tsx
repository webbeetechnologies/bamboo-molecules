import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Text, View } from 'react-native';
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

export const Default: ComponentStory<typeof Example> = args => (
    <View style={{ minWidth: 300 }}>
        <Example {...args} />
    </View>
);

Default.args = {
    maxItemsPerRow: 3,
    sections: [
        {
            title: 'Numbers',
            data: [
                {
                    text: '1',
                },
                {
                    text: '2',
                },
                {
                    text: '3',
                },
                {
                    text: '4',
                },
            ],
        },
        {
            title: 'Letters',
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
            ],
        },
    ],
    renderItem: ({ item }: any) => <Text>{item.text}</Text>,
    renderSectionHeader: ({ section }) => <Text style={{ fontSize: 20 }}>{section.title}</Text>,
};

Default.parameters = {
    docs: {
        source: {
            code: `
<SectionGrid {...props} itemDimension={130} sections={[
        {
            title: 'Numbers',
            data: [
                {
                    text: '1',
                },
                {
                    text: '2',
                },
                {
                    text: '3',
                },
                {
                    text: '4',
                },
            ],
        },
        {
            title: 'Letters',
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
            ],
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
