import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProvideMolecules } from '../../common';

import { Example, ListItemTitle, ListItemDescription } from './ListItem';
import { Example as Icon } from '../Icon/Icon';

export default {
    title: 'components/ListItem',
    component: Example,
    decorators: [
        Story => (
            <ProvideMolecules>
                <Story />
            </ProvideMolecules>
        ),
    ],
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    children: (
        <>
            <ListItemTitle>This is the title</ListItemTitle>
            <ListItemDescription>This is the description</ListItemDescription>
        </>
    ),
};

Default.parameters = {
    docs: {
        source: {
            code: `
<ListItem>
         <>
            <ListItem.Title>This is the title</ListItem.Title>
            <ListItem.Description>This is the description</ListItem.Description>
        </>
</ListItem>
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const WithLeftElement: ComponentStory<typeof Example> = args => <Example {...args} />;

WithLeftElement.args = {
    left: <Icon name="robot-angry-outline" type="material-community" size={30} />,
    children: (
        <>
            <ListItemTitle>ListItem with Left Element</ListItemTitle>
            <ListItemDescription>Supporting Text</ListItemDescription>
        </>
    ),
};

WithLeftElement.parameters = {
    docs: {
        source: {
            code: `
<ListItem left={<Icon name="robot-angry-outline" type="material-community" size={30} />}>
        <>
            <ListItem.Title>ListItem with Left Element</ListItem.Title>
            <ListItem.Description>Supporting Text</ListItem.Description>
        </>
<ListItem>
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const WithRightElement: ComponentStory<typeof Example> = args => <Example {...args} />;

WithRightElement.args = {
    right: <Icon name="account-plus-outline" type="material-community" size={30} />,
    children: (
        <>
            <ListItemTitle>ListItem with Right Element</ListItemTitle>
            <ListItemDescription>Supporting Text</ListItemDescription>
        </>
    ),
};

WithRightElement.parameters = {
    docs: {
        source: {
            code: `
<ListItem right={<Icon name="account-plus-outline" type="material-community" size={30} />}>
        <>
            <ListItem.Title>ListItem with Right Element</ListItem.Title>
            <ListItem.Description>Supporting Text</ListItem.Description>
        </>
<ListItem>
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const WithDivider: ComponentStory<typeof Example> = args => <Example {...args} />;

WithDivider.args = {
    divider: true,
    children: (
        <>
            <ListItemTitle>ListItem with Divider</ListItemTitle>
            <ListItemDescription>Supporting Text</ListItemDescription>
        </>
    ),
};

WithDivider.parameters = {
    docs: {
        source: {
            code: `
<ListItem divider={true}>
     <>
        <ListItem.Title>ListItem with Divider</ListItem.Title>
        <ListItem.Description>Supporting Text</ListItem.Description>
     </>
<ListItem>
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
