import { Text } from 'react-native';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Example as ListItem, ListItemTitle } from '../ListItem/ListItem';

import { Example } from './Select';

export default {
    title: 'components/Select',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    searchable: true,
    onQueryChange: () => {},
    records: [
        {
            title: 'Numbers',
            data: [
                {
                    label: '1',
                },
                {
                    label: '2',
                },
                {
                    label: '3',
                },
                {
                    label: '4',
                },
            ],
        },
        {
            title: 'Letters',
            data: [
                {
                    label: 'A',
                },
                {
                    label: 'B',
                },
                {
                    label: 'C',
                },
                {
                    label: 'D',
                },
            ],
        },
    ],
    renderItem: ({ item }: any) => (
        <ListItem>
            <ListItemTitle>{item.label}</ListItemTitle>
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
