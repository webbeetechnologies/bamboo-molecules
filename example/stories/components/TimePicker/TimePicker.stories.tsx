import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './TimePicker';

export default {
    title: 'components/TimePicker',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    hours: 10,
    minutes: 15,
};

Default.parameters = {
    docs: {
        source: {
            code: `
<TimePicker hours={10} minutes={15} />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
