import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './Tooltip';

export default {
    title: 'components/Tooltip',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {};

Default.parameters = {
    docs: {
        source: {
            code: `
 <Tooltip>
    <Tooltip.Trigger>
        <IconButton name="star-outline" />
    </Tooltip.Trigger>
    <Tooltip.Content>
        <Text>mark as favorite</Text>
    </Tooltip.Content>
</Tooltip>`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
