import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './IconButton';

export default {
    title: 'components/IconButton',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    name: 'home-outline',
    onPress: () => {},
    disabled: false,
    size: 30,
};

Default.parameters = {
    docs: {
        source: {
            code: `
    const { IconButton } = useMolecules();

    return <IconButton name="home-outline" onPress={() => {}} />;`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
