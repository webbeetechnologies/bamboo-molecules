import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './UseCurrentTheme';
import DocsPage from './UseCurrentTheme.docs';

export default {
    title: 'hooks/UseCurrentTheme',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    color: 'primary',
};

Default.parameters = {
    docs: {
        page: DocsPage,
    },
};
