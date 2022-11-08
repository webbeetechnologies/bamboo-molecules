import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProvideMolecules } from 'bamboo-molecules';

import { Example } from './Surface';

export default {
    title: 'components/Surface',
    component: Example,
    decorators: [
        Story => (
            <ProvideMolecules>
                <Story />
            </ProvideMolecules>
        ),
    ],
    argTypes: {
        elevation: { control: { type: 'number' } },
    },
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {};

Default.parameters = {
    docs: {
        source: {
            code: `
<Surface style={{ width: 100, height: 100, backgroundColor: '#f1f1f1' }} {...props}>
    &nbsp;
</Surface>
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
