import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './UseIsKeyPressed';
import DocsPage from './UseIsKeyPressed.docs';

export default {
    title: 'ShortcutsManager/useIsKeyPressed',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = () => <Example />;

Default.parameters = {
    docs: {
        page: DocsPage,
    },
};
