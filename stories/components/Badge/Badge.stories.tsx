import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './Badge';

export default {
    title: 'components/Badge',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    label: '10',
};

Default.parameters = {
    docs: {
        source: {
            code: `
    const { Badge } = useMolecules();

    return <Badge label="10" />;
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const SmallBadge: ComponentStory<typeof Example> = args => <Example {...args} />;

SmallBadge.args = {
    size: 'sm',
};

SmallBadge.parameters = {
    docs: {
        source: {
            code: `
    const { Badge } = useMolecules();

    return <Badge size="sm" />;
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
