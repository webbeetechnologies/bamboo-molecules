import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProvideMolecules } from 'bamboo-molecules';

import { Example } from './ListItem';

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
    title: 'Headline',
    description: 'Supporting text',
};

Default.parameters = {
    docs: {
        source: {
            code: `
<ListItem title="Headline" description="Supporting text />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
