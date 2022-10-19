import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './WithActionStates';
import DocsPage from './WithActionStates.docs';

export default {
    title: 'hocs/WithActionStates',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = () => <Example />;

Default.parameters = {
    docs: {
        page: DocsPage,
    },
};
