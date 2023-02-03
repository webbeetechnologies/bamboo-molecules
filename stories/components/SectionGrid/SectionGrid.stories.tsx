import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Text, useWindowDimensions, View } from 'react-native';
import { generateSectionListData, ProvideMolecules } from '../../common';

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
    <View style={{ maxHeight: 500, maxWidth: useWindowDimensions().width }}>
        <Example {...args} />
    </View>
);

Default.args = {
    maxItemsPerRow: 3,
    sections: generateSectionListData(10, 100),
    renderItem: ({ item }: any) => <Text>{item.title}</Text>,
    renderSectionHeader: ({ section }) => <Text style={{ fontSize: 20 }}>{section.title}</Text>,
};

Default.parameters = {
    docs: {
        source: {
            code: `
<SectionGrid itemDimension={130} sections={[
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
    renderItem={({ item }: any) => <Text>{item}</Text>}
    renderSectionHeader={({ section }) => <Text style={{ fontSize: 20 }}>{section.title}</Text>}
    />`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
