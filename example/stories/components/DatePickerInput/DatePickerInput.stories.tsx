import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './DatePickerInput';

export default {
    title: 'components/DatePickerInput',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    locale: 'en',
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
