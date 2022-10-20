import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './UsePlatformType';
import DocsPage from './UsePlatformType.docs';

export default {
    title: 'hooks/usePlatformType',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = () => <Example />;

Default.parameters = {
    docs: {
        page: DocsPage,
    },
};
