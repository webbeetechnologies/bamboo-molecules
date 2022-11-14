import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProvideMolecules } from '../../common';

import { Example } from './Switch';

export default {
    title: 'components/Switch',
    component: Example,
    decorators: [
        Story => (
            <ProvideMolecules>
                <Story />
            </ProvideMolecules>
        ),
    ],
    argTypes: {
        thumbTintColor: { control: { type: 'color' } },
        thumbColor: { control: { type: 'color' } },
        trackColor: { control: { type: 'color' } },
        disabled: { control: { type: 'boolean' } },
    },
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {};

Default.parameters = {
    docs: {
        source: {
            code: `
<Switch value={isOn} onValueChange={toggle} {...props} />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
