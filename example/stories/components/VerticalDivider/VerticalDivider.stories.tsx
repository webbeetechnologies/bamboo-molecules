import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProvideMolecules } from 'bamboo-molecules';

import { Example } from './VerticalDivider';

export default {
    title: 'components/VerticalDivider',
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
