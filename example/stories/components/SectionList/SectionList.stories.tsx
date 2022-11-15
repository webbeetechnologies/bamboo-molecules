import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProvideMolecules } from '../../common';
import { Example as ListItem, ListItemTitle } from '../ListItem/ListItem';

import { Example } from './SectionList';
import { Text, View } from 'react-native';

export default {
    title: 'components/SectionList',
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
    sections: [
        { title: 'Numbers', data: ['1', '2', '3', '4'] },
        { title: 'Letters', data: ['A', 'B', 'C', 'D'] },
    ],
    renderItem: ({ item }: any) => (
        <ListItem>
            <ListItemTitle>{item}</ListItemTitle>
        </ListItem>
    ),
    renderSectionHeader: ({ section }: any) => (
        <Text style={{ fontSize: 25 }}>{section.title}</Text>
    ),
};

Default.parameters = {
    docs: {
        source: {
            code: `
<SectionList {...props} 
    sections={[
        { title: 'Numbers', data: ['1', '2', '3', '4'] },
        { title: 'Letters', data: ['A', 'B', 'C', 'D'] },
    ]} 
    renderItem={({ item }) => (
        <ListItem>
            <ListItem.Title>{item}</ListItem.Title>
        </ListItem>
    )}
    renderSectionHeader={({ section }) => (
        <Text style={{ fontSize: 25 }}>{section.title}</Text>
    )} />`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
