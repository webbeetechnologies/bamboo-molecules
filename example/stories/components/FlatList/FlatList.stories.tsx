import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { generateFlatListData, ProvideMolecules } from '../../common';
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
    data: generateFlatListData(1000),
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
<FlatList
    data={[
        {
            title: 'Item 0',
        },
         {
            title: 'Item 1',
        },
         {
            title: 'Item 2',
        },
         {
            title: 'Item 3',
        },
         {
            title: 'Item 4',
        },
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
