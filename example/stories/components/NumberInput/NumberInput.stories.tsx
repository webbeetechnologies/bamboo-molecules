import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { NumberInputMasks, ProvideMolecules } from 'bamboo-molecules';

import { Example } from './NumberInput';

export default {
    title: 'components/NumberInput',
    component: Example,
    decorators: [
        Story => (
            <ProvideMolecules>
                <Story />
            </ProvideMolecules>
        ),
    ],
    argTypes: {},
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    placeholder: 'Placeholder',
    label: 'Enter numbers',
};

Default.parameters = {
    docs: {
        source: {
            code: `
<NumberInput placeholder="Placeholder" value={number} onChangeText={masked => setNumber(masked)} {...props}  />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const WithCustomMask: ComponentStory<typeof Example> = args => <Example {...args} />;

WithCustomMask.args = {
    placeholder: 'Placeholder',
    label: 'Credit card',
    mask: NumberInputMasks.CREDIT_CARD,
};

WithCustomMask.parameters = {
    docs: {
        source: {
            code: `
<NumberInput placeholder="Placeholder" value={number} onChangeText={masked => setNumber(masked)} {...props} />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
