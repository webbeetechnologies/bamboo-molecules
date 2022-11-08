import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProvideMolecules } from 'bamboo-molecules';

import { Example } from './ActivityIndicator';

export default {
    title: 'components/ActivityIndicator',
    component: Example,
    decorators: [
        Story => (
            <ProvideMolecules>
                <Story />
            </ProvideMolecules>
        ),
    ],
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
<Icon name="share" type="material-community" {...rest} />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
