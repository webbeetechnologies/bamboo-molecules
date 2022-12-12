import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './TimePickerModal';

export default {
    title: 'components/TimePickerModal',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    isOpen: true,
    locale: 'en',
    hours: 10,
    minutes: 15,
};

Default.parameters = {
    docs: {
        source: {
            code: `
<TimePickerModal locale="en" hours={10} minutes={15} {...rest} />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
