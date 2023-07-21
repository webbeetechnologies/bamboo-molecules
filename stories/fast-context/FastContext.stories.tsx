import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './FastContext';
import DocsPage from './FastContext.docs';

export default {
    title: 'FastContext/fast-context',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = () => <Example />;

Default.parameters = {
    docs: {
        page: DocsPage,
    },
};
