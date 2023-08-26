import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './Portal';
import { ProvideMolecules } from '../../common';
import DocsPage from './Portal.docs';

export default {
    title: 'components/Portal',
    component: Example,
    decorators: [
        Story => (
            <ProvideMolecules>
                <Story />
            </ProvideMolecules>
        ),
    ],
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {};

Default.parameters = {
    docs: {
        page: DocsPage,
    },
};
