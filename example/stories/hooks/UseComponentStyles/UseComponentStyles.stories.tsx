import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './UseComponentStyles';
import DocsPage from './UseComponentStyles.docs';

export default {
    title: 'hooks/UseComponentStyles',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    variant: 'outlined',
    onPress: () => {},
};

Default.parameters = {
    docs: {
        page: DocsPage,
    },
};
