import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProvideMolecules } from 'bamboo-molecules';

import { Example } from './FlatList';

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
    argTypes: {
        disabled: { control: { type: 'boolean' } },
        pressed: { control: { type: 'boolean' } },
        hovered: { control: { type: 'boolean' } },
        focused: { control: { type: 'boolean' } },
    },
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {};

Default.parameters = {
    docs: {
        source: {
            code: `<FlatList {...props} data={data} renderItem={renderItem} />`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
