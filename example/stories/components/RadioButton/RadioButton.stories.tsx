import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example, ExampleRadioItem, ExampleWithRadioGroup } from './RadioButton';

export default {
    title: 'components/RadioButton',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    value: 'example',
};

Default.parameters = {
    docs: {
        source: {
            code: `
<RadioButton />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const RadioItem: ComponentStory<typeof ExampleRadioItem> = args => (
    <ExampleRadioItem {...args} />
);

RadioItem.args = {
    value: 'item',
    label: 'Radio Item Label',
};

RadioItem.parameters = {
    docs: {
        source: {
            code: `
<RadioButton.Item value="item" label="Radio Item Label" />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const WithRadioGroup: ComponentStory<typeof ExampleWithRadioGroup> = args => (
    <ExampleWithRadioGroup {...args} />
);

WithRadioGroup.args = {
    defaultValue: 'second',
    children: (
        <>
            <ExampleRadioItem value="first" label="First Item" />
            <ExampleRadioItem value="second" label="Second Item" />
        </>
    ),
};

WithRadioGroup.parameters = {
    docs: {
        source: {
            code: `
    const { RadioButton } = useMolecules();
    const [value, onValueChange] = useState('');
    
    return (
        <RadioButton.Group onValueChange={onValueChange} value={value}>
            <RadioButton.Item value="first" label="First Item" />
            <RadioButton.Item value="second" label="Second Item" />
        </RadioButton.Group>
    )
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
