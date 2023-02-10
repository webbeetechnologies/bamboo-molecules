import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Example } from './Grid';
import GridRenderer from './GridRenderer';

export default {
    title: 'components/Grid',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    data: [
        {
            name: 'grid1',
            breakPoints: {
                lg: 12,
            },
        },
        {
            name: 'grid2',
            breakPoints: {
                lg: 12,
            },
        },
    ],
    renderer: GridRenderer,
};
