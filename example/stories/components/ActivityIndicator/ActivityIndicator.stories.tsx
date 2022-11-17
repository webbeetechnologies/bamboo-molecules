import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './ActivityIndicator';

export default {
    title: 'components/ActivityIndicator',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    animating: true,
    color: 'colors.primary',
    size: 30,
};

Default.parameters = {
    docs: {
        source: {
            code: `
<ActivityIndicator color="colors.primary" size={30} animating {...rest} />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
