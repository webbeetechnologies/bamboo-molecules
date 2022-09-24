import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './ThemeProvider';
import DocsPage from './ThemeProvider.docs';

export default {
    title: 'core/ThemeProvider',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    variants: 'primary',
};

Default.parameters = {
    docs: {
        page: DocsPage,
    },
};
