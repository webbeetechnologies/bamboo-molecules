import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example, UseTokenExampleProps } from './UseToken';
import DocsPage from './UseToken.docs';

export default {
    title: 'hooks/useToken',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = (props: UseTokenExampleProps) => (
    <Example {...props} />
);

Default.args = {
    token: 'spacings.3',
};

Default.parameters = {
    docs: {
        page: DocsPage,
    },
};
