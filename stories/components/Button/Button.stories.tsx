import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './Button';

export default {
    title: 'components/Button',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Text: ComponentStory<typeof Example> = args => <Example {...args} />;

Text.args = {
    children: 'Text Button',
    variant: 'text',
};

Text.parameters = {
    docs: {
        source: {
            code: `
<Button variant="text">Default Button</Button>
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const Contained: ComponentStory<typeof Example> = args => <Example {...args} />;

Contained.args = {
    children: 'Contained Button',
    variant: 'contained',
};

Contained.parameters = {
    docs: {
        source: {
            code: `
<Button variant="contained">Contained Button</Button>
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const Outlined: ComponentStory<typeof Example> = args => <Example {...args} />;

Outlined.args = {
    children: 'Outlined Button',
    variant: 'outlined',
};

Outlined.parameters = {
    docs: {
        source: {
            code: `
<Button variant="outlined">Outlined Button</Button>
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const ContainedTonal: ComponentStory<typeof Example> = args => <Example {...args} />;

ContainedTonal.args = {
    children: 'ContainedTonal Button',
    variant: 'contained-tonal',
};

ContainedTonal.parameters = {
    docs: {
        source: {
            code: `
<Button variant="contained-tonal">ContainedTonal Button</Button>
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const Elevated: ComponentStory<typeof Example> = args => <Example {...args} />;

Elevated.args = {
    children: 'Elevated Button',
    variant: 'elevated',
};

Elevated.parameters = {
    docs: {
        source: {
            code: `
<Button variant="elevated">Elevated Button</Button>
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const ButtonPerformance: ComponentStory<typeof Example> = args => {
    return <Example {...args} />;
};

ButtonPerformance.args = {
    children: 'Performance Button',
    variant: 'elevated',
};

ButtonPerformance.parameters = {
    docs: {
        source: {
            code: `
<Button variant="elevated">Performance Button</Button>
`,
            language: 'tsx',
            type: 'auto',
        },
    },
    performance: {
        allowedGroups: ['client'],
    },
};
