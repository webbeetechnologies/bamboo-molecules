import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './WithRipple';
import DocsPage from './WithRipple.docs';

export default {
    title: 'hocs/withRipple',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = () => <Example />;

Default.parameters = {
    docs: {
        page: DocsPage,
    },
};
