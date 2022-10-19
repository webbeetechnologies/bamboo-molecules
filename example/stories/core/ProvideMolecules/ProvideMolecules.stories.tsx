import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './ProvideMolecules';
import DocsPage from './ProvideMolecules.docs';

export default {
    title: 'core/ProvideMolecules',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    variant: 'contained',
    onPress: () => {},
};

Default.parameters = {
    docs: {
        page: DocsPage,
    },
};
