import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './TimePicker';

export default {
    title: 'components/TimePicker',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    locale: 'en',
    hours: 10,
    minutes: 15,
};

Default.parameters = {
    docs: {
        source: {
            code: `
<TimePicker locale="en" hours={10} minutes={15} {...rest} />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
