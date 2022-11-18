import { Text, View } from 'react-native';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProvideMolecules } from '../../common';
import { Example as ListItem, ListItemTitle } from '../ListItem/ListItem';

import { Example } from './OptionList';

export default {
    title: 'components/OptionList',
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
    searchable: true,
    records: [
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
    renderItem: ({ item }: any) => (
        <ListItem>
            <ListItemTitle>{item.text}</ListItemTitle>
        </ListItem>
    ),
    renderSectionHeader: ({ section }: any) => (
        <Text style={{ fontSize: 25 }}>{section.title}</Text>
    ),
    searchInputProps: {
        label: 'Search . . .',
    },
};

Default.parameters = {
    docs: {
        source: {
            code: `
<OptionList {...props} 
    sections={[
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
