import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './Popover';
import { ProvideMolecules } from 'bamboo-molecules';

export default {
    title: 'components/Popover',
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
    name: 'robot-angry-outline',
    type: 'material-community',
    size: 50,
    color: '#333',
};

Default.parameters = {
    docs: {
        source: {
            code: `
<Popover name="share" type="material-community" {...rest} />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
