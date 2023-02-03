import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example, NestedThemeExample } from './ProvideMolecules';
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

export const NestedTheme: ComponentStory<typeof Example> = NestedThemeExample;

NestedTheme.args = {
    variant: 'contained',
    onPress: () => {},
};

NestedTheme.parameters = {
    docs: {
        page: DocsPage,
    },
};
