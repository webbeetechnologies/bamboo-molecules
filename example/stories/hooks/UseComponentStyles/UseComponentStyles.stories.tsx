import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './UseComponentStyles';
import DocsPage from './UseComponentStyles.docs';

export default {
    title: 'hooks/useComponentStyles',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = () => <Example />;

Default.parameters = {
    docs: {
        page: DocsPage,
    },
};
