import { View } from 'react-native';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { generateFlatListData } from '../../common';
import { Example as ListItem, ListItemTitle } from '../ListItem/ListItem';

import { Example } from './OptionFlatList';

export default {
    title: 'components/OptionFlatList',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => (
    <View style={{ minWidth: 300, maxHeight: 500 }}>
        <Example {...args} />
    </View>
);

Default.args = {
    searchable: true,
    onQueryChange: () => {},
    records: generateFlatListData(100),
    renderItem: ({ item }: any) => (
        <ListItem>
            <ListItemTitle>{item.title}</ListItemTitle>
        </ListItem>
    ),
    searchInputProps: {
        label: 'Search . . .',
    },
};

Default.parameters = {
    docs: {
        source: {
            code: `
<OptionFlatList
    records={[
          { title: "item 0" },
          { title: "item 1" },
          { title: "item 2" },
          { title: "item 3" },
          { title: "item 4" },
          { title: "item 5" },
          { title: "item 6" },
          { title: "item 7" },
          { title: "item 8" },
          // . . .
          ]}
    renderItem={({ item }) => (
        <ListItem>
            <ListItem.Title>{item}</ListItem.Title>
        </ListItem>
    )}
  />`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
