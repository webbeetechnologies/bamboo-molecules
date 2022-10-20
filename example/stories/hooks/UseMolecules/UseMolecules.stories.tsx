import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './UseMolecules';
import DocsPage from './UseMolecules.docs';

export default {
    title: 'hooks/useMolecules',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = () => <Example />;

Default.parameters = {
    docs: {
        page: DocsPage,
    },
};
