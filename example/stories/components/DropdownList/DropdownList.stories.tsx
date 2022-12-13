import { Text } from 'react-native';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProvideMolecules } from '../../common';
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
    records: [
        {
            title: 'Numbers',
            data: [
                {
                    id: 11,
                    text: '1',
                },
                {
                    id: 12,
                    text: '2',
                },
                {
                    id: 13,
                    text: '3',
                },
                {
                    id: 14,
                    text: '4',
                },
            ],
        },
        {
            title: 'Letters',
            data: [
                {
                    id: 21,
                    text: 'A',
                },
                {
                    id: 22,
                    text: 'B',
                },
                {
                    id: 23,
                    text: 'C',
                },
                {
                    id: 24,
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
    actionSheetProps: {
        gestureEnabled: true,
        snapPoints: [30, 50, 100],
    },
};

Default.parameters = {
    docs: {
        source: {
            code: `
<OptionList {...props} 
    records={[
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
