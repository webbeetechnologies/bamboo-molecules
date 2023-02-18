import { StyleSheet, Text, View } from 'react-native';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { generateSectionListData, ProvideMolecules } from '../../common';
import { Example as ListItem, ListItemTitle } from '../ListItem/ListItem';
import { Example } from './SectionList';

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
    <View style={styles.container}>
        <Example {...args} />
    </View>
);

Default.args = {
    sections: generateSectionListData(10, 100),
    renderItem: ({ item }: any) => (
        <ListItem>
            <ListItemTitle>{item.title}</ListItemTitle>
        </ListItem>
    ),
    renderSectionHeader: ({ section }: any) => <Text style={styles.text}>{section.title}</Text>,
};

const styles = StyleSheet.create({
    container: { minWidth: 300, maxHeight: 500 },
    text: {
        fontSize: 25,
    },
});

Default.parameters = {
    docs: {
        source: {
            code: `
<SectionList
    records={[
    {
        id: 0,
        title: "section 0",
        data: [
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
          ]
    },
      {
          id: 1,
          title: "section 1",
          data: [
              { title: "item 10" },
              { title: "item 11" },
              { title: "item 12" },
              { title: "item 13" },
              { title: "item 14" },
              { title: "item 15" },
              { title: "item 16" },
              { title: "item 17" },
              { title: "item 18" },
            // . . .
            ]
    },
    // . . .
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
