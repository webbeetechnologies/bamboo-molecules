import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import {
    Example,
    ExampleRadioItem,
    ExampleWithRadioGroup,
    ExampleWithUncontrolledRadioGroup,
} from './RadioButton';
import { delay } from '../../common';

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
    children: (
        <>
            <ExampleRadioItem value="first" label="First Item" testID="first-radio-item" />
            <ExampleRadioItem value="second" label="Second Item" testID="second-radio-item" />
        </>
    ),
};

WithRadioGroup.parameters = {
    controls: {
        exclude: /(?:\b|')(value|onValueChange)(?:\b|')/,
    },
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

export const WithRadioGroupUncontrolled: ComponentStory<
    typeof ExampleWithUncontrolledRadioGroup
> = args => <ExampleWithUncontrolledRadioGroup {...args} />;

WithRadioGroupUncontrolled.args = {
    defaultValue: 'second',
    children: (
        <>
            <ExampleRadioItem value="first" label="First Item" />
            <ExampleRadioItem value="second" label="Second Item" />
        </>
    ),
};

WithRadioGroupUncontrolled.parameters = {
    docs: {
        source: {
            code: `
    const { RadioButton } = useMolecules();
    
    return (
        <RadioButton.Group>
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

export const Interactions = WithRadioGroup.bind({});

Interactions.args = {
    ...WithRadioGroup.args,
};

Interactions.parameters = {
    ...WithRadioGroup.parameters,
};

Interactions.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const firstRadioItem = canvas.getByTestId('first-radio-item');
    const secondRadioItem = canvas.getByTestId('second-radio-item');
    const firstRadio = within(firstRadioItem).getByRole('radio');
    const secondRadio = within(secondRadioItem).getByRole('radio');

    await delay(500);

    // click the first item
    await userEvent.click(firstRadioItem);

    await delay(500);

    // the first item should be selected
    await expect(window.getComputedStyle(firstRadio.children[0]).borderColor).toBe(
        'rgb(103, 80, 164)',
    );

    await delay(500);

    // click the second item
    await userEvent.click(secondRadioItem);

    await delay(500);

    // the second item should be selected
    await expect(window.getComputedStyle(secondRadio.children[0]).borderColor).toBe(
        'rgb(103, 80, 164)',
    );
};
