import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './UseToggle';
import DocsPage from './UseToggle.docs';

export default {
    title: 'hooks/useToggle',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = () => <Example />;

Default.parameters = {
    docs: {
        page: DocsPage,
    },
};
