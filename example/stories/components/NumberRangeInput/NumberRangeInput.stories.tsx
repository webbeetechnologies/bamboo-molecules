import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './NumberRangeInput';

export default {
    title: 'components/NumberRangeInput',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {};

Default.parameters = {
    docs: {
        source: {
            code: `
<NumberRangeInput />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
