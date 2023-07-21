import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example, ExampleHorizontalVirtualization } from './DataGrid';

export default {
    title: 'components/DataGrid',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = () => <Example />;

Default.args = {};

Default.parameters = {
    docs: {
        source: {
            code: `
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const HorizontalVirtualization: ComponentStory<
    typeof ExampleHorizontalVirtualization
> = () => <ExampleHorizontalVirtualization />;

HorizontalVirtualization.args = {};

HorizontalVirtualization.parameters = {
    docs: {
        source: {
            code: `
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
