import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './NumberRangeInput';

export default {
    title: 'components/NumberRangeInput',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {};

Default.parameters = {
    docs: {
        source: {
            code: `
    const { NumberRangeInput } = useMolecules();
    const [value, setValue] = useState({ min: '', max: '' });

    return <NumberRangeInput {...props} min={value.min} max={value.max} onChange={setValue} />;
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
