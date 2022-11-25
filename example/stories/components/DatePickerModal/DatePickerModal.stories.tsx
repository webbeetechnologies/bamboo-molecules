import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './DatePickerModal';

export default {
    title: 'components/DatePickerModal',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    locale: 'en',
    isOpen: true,
};

Default.parameters = {
    docs: {
        source: {
            code: `
<DatePickerInput {...rest} />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
