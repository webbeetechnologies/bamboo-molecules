import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './Avatar';

export default {
    title: 'components/Avatar',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    label: 'Thet Aung',
    size: 60,
    source: { uri: 'https://www.eyerys.com/sites/default/files/mark_zuckerberg.jpg' },
};

Default.parameters = {
    docs: {
        source: {
            code: `
export const Example = () => {
    return <Avatar size={60} label="Thet Aung" source={source} />;
};
const source = {
  uri: 'https://www.eyerys.com/sites/default/files/mark_zuckerberg.jpg'
}
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
