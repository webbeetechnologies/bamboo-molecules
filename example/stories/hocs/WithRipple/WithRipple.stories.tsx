import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './WithRipple';
import DocsPage from './WithRipple.docs';

export default {
    title: 'hocs/WithRipple',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    style: {
        width: 200,
        height: 100,
        backgroundColor: '#f1f1f1',
    },
};

Default.parameters = {
    docs: {
        page: DocsPage,
    },
};
