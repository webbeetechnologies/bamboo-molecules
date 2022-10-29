import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProvideMolecules } from 'bamboo-molecules';

import { Example } from './ListItem';
import { Example as Icon } from '../Icon/Icon';

export default {
    title: 'components/ListItem',
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
    title: 'Headline',
    description: 'Supporting text',
};

Default.parameters = {
    docs: {
        source: {
            code: `
<ListItem title="Headline" description="Supporting text" />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const Left: ComponentStory<typeof Example> = args => <Example {...args} />;

Left.args = {
    left: <Icon name="robot-angry-outline" type="material-community" />,
    title: 'Headline',
    description: 'Supporting text',
};

Left.parameters = {
    docs: {
        source: {
            code: `
<ListItem title="Headline" description="Supporting text" />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const Right: ComponentStory<typeof Example> = args => <Example {...args} />;

Right.args = {
    right: <Icon name="account-plus-outline" type="material-community" />,
    title: 'Headline',
    description: 'Supporting text',
};

Right.parameters = {
    docs: {
        source: {
            code: `
<ListItem title="Headline" description="Supporting text" />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const Divider: ComponentStory<typeof Example> = args => <Example {...args} />;

Divider.args = {
    divider: true,
    title: 'Headline',
    description: 'Supporting text',
};

Divider.parameters = {
    docs: {
        source: {
            code: `
<ListItem title="Headline" description="Supporting text" />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
