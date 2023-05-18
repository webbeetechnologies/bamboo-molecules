import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './UseHandleNumberFormat';
import DocsPage from './UseHandleNumberFormat.docs';

export default {
    title: 'hooks/UseHandleNumberFormat',
    component: Example,
} as ComponentMeta<typeof Example>;

const Template: ComponentStory<typeof Example> = args => <Example {...args} />;

export const Default = Template.bind({});

Default.args = {
    config: {
        prefix: 'Rs.',
        suffix: '',
        separator: '.',
        delimiter: ',',
        precision: 2,
        allowNegative: true,
    },
};

Default.parameters = {
    controls: {
        exclude: /(?:\b|')(value|onChangeText|DefaultValue)(?:\b|')/,
    },
    docs: {
        page: DocsPage,
    },
};
