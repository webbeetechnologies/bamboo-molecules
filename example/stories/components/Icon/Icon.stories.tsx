import React from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './Icon';

export default {
    title: 'components/Icon',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    name: 'robot-angry-outline',
    type: 'material-community',
    size: 50,
    color: '#333',
};

Default.parameters = {
    docs: {
        source: {
            code: `
<Icon name="share" type="material-community" {...rest} />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
