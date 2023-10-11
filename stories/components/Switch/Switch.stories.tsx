import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './Switch';

export default {
    title: 'components/Switch',
    component: Example,

    argTypes: {
        thumbColor: { control: { type: 'color' } },
        trackColor: { control: { type: 'color' } },
        disabled: { control: { type: 'boolean' } },
    },
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {};

Default.parameters = {
    docs: {
        source: {
            code: `
const { state: isOn, onToggle } = useToggle();
<Switch value={isOn} onValueChange={onToggle} checkedIcon={"check"} unCheckedIcon={"close"} />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
