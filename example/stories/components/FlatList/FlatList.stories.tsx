import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProvideMolecules } from '../../common';
import { Example as ListItem, ListItemTitle } from '../ListItem/ListItem';

import { Example } from './FlatList';
import { View } from 'react-native';

export default {
    title: 'components/FlatList',
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
    data: [
        { title: 'First item title', description: 'First item description' },
        { title: 'Second item title', description: 'Second item description' },
    ],
    renderItem: ({ item }: any) => (
        <ListItem>
            <ListItemTitle>{item.title}</ListItemTitle>
        </ListItem>
    ),
};

Default.parameters = {
    docs: {
        source: {
            code: `
<FlatList {...props} 
    data={[
        { title: 'First item title', description: 'First item description' },
        { title: 'Second item title', description: 'Second item description' },
    ]}
    renderItem={({ item }: any) => (
        <ListItem>
            <ListItemTitle>{item.title}</ListItemTitle>
        </ListItem>
    )}
 />`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
