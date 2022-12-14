import { Text } from 'react-native';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { generateSectionListData, ProvideMolecules } from '../../common';
import { Example as ListItem, ListItemTitle } from '../ListItem/ListItem';

import { ExampleWithToggle } from './DropdownList';

export default {
    title: 'components/DropdownList',
    component: ExampleWithToggle,
    decorators: [
        Story => (
            <ProvideMolecules>
                <Story />
            </ProvideMolecules>
        ),
    ],
} as ComponentMeta<typeof ExampleWithToggle>;

export const Default: ComponentStory<typeof ExampleWithToggle> = args => (
    <ExampleWithToggle {...args} />
);

Default.args = {
    searchable: true,
    onQueryChange: () => {},
    records: generateSectionListData(10, 100),
    renderItem: ({ item }: any) => (
        <ListItem>
            <ListItemTitle>{item.title}</ListItemTitle>
        </ListItem>
    ),
    renderSectionHeader: ({ section }: any) => (
        <Text style={{ fontSize: 25 }}>{section.title}</Text>
    ),
    actionSheetProps: {
        gestureEnabled: true,
        snapPoints: [30, 50, 100],
    },
};

Default.parameters = {
    docs: {
        source: {
            code: `
<DropdownList
    searchable
    onQueryChange={() => {}}
    renderItem={({ item }: any) => (
        <ListItem>
            <ListItemTitle>{item.title}</ListItemTitle>
        </ListItem>
    )}
    renderSectionHeader={({ section }: any) => (
        <Text style={{ fontSize: 25 }}>{section.title}</Text>
    )}
    actionSheetProps={{
        gestureEnabled: true,
        snapPoints: [30, 50, 100],
    }}
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
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
