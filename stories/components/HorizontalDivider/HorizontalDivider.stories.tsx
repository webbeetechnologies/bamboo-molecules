import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './HorizontalDivider';

export default {
    title: 'components/HorizontalDivider',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {};

Default.parameters = {
    docs: {
        source: {
            code: `
<View>
    <Text>Above</Text>
    <HorizontalDivider spacing={10} {...props} />
    <Text>Below</Text>
</View>
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
