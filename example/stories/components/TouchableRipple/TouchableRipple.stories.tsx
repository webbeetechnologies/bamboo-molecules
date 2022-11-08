import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProvideMolecules } from 'bamboo-molecules';

import { Example } from './TouchableRipple';

export default {
    title: 'components/TouchableRipple',
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
<TouchableRipple
      style={{ width: 200, height: 100, backgroundColor: '#f1f1f1' }}
      onPress={() => {}}
      {...props}>
      <Text>Touchable Ripple</Text>
</TouchableRipple>
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
