import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { View, Text, StyleSheet } from 'react-native';
import { generateFlatListData, ProvideMolecules } from '../../common';

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
    <View style={styles.container}>
        <Example {...args} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        maxWidth: 300,
        maxHeight: 500,
    },
});

Default.args = {
    itemDimension: 130,
    data: generateFlatListData(1000),
    renderItem: ({ item }: any) => <Text>{item.title}</Text>,
};

Default.parameters = {
    docs: {
        source: {
            code: `
<FlatGrid 
    itemDimension={130} 
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
        // ...
    ]} 
    renderItem={({ item }: any) => <Text>{item}</Text>} />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
