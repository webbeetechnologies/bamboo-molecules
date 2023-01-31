import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example, ControlledExample } from './NumberRangeInput';

export default {
    title: 'components/NumberRangeInput',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Controlled: ComponentStory<typeof Example> = args => <ControlledExample {...args} />;

Controlled.args = {};

Controlled.parameters = {
    controls: {
        exclude: /(?:\b|')(value|onChange)(?:\b|')/,
    },
    docs: {
        source: {
            code: `
    const { NumberRangeInput } = useMolecules();
    const [value, setValue] = useState({ min: '10', max: '8' });

    return <NumberRangeInput value={value} onChange={setValue} />;
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
