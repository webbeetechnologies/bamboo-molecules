import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './UseCurrentTheme';
import DocsPage from './UseCurrentTheme.docs';

export default {
    title: 'hooks/useCurrentTheme',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = () => <Example />;

Default.parameters = {
    docs: {
        page: DocsPage,
    },
};
