import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './Switch';

export default {
    title: 'components/Switch',
    component: Example,

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
