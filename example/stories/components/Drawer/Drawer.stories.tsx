import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './Drawer';

export default {
    title: 'components/Drawer',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {};

Default.parameters = {
    docs: {
        source: {
            code: ``,
            language: 'tsx',
            type: 'auto',
        },
    },
};
