import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Example } from './Grid';
import GridRenderer from './GridRenderer';
import DocsPage from './Grid.docs';

export default {
    title: 'components/Grid',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    data: [
        {
            name: 'grid1',
            breakpoints: {
                lg: 12,
            },
        },
        {
            name: 'grid2',
            breakpoints: {
                lg: 12,
            },
        },
    ],
    renderer: GridRenderer,

    // Optional props
    numberOfColumns: 12,
    referenceBreakpoints: {
        xs: 320,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
    },
};

Default.parameters = {
    docs: {
        page: DocsPage,
    },
};
