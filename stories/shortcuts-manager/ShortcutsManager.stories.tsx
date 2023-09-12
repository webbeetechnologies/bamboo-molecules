import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './ShortcutsManager';
import DocsPage from './ShortcutsManager.docs';

export default {
    title: 'ShortcutsManager/shortcuts-manager',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = () => <Example />;

Default.parameters = {
    docs: {
        page: DocsPage,
    },
};