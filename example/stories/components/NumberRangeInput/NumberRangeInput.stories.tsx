import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { Example, ControlledExample } from './NumberRangeInput';
import { delay } from '../../common';

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

    return <NumberRangeInput />;
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

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

export const Interactions = Default.bind({});

Interactions.args = {
    ...Controlled.args,
    minInputProps: {
        testID: 'numberRangeInput-min',
    },
    maxInputProps: {
        testID: 'numberRangeInput-max',
    },
};

Interactions.parameters = {
    ...Default.parameters,
};

Interactions.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await delay(500);

    // type min
    await userEvent.type(canvas.getByTestId('numberRangeInput-min-flat'), '88');

    await delay(500);

    // type max
    await userEvent.type(canvas.getByTestId('numberRangeInput-max-flat'), '10');

    await delay(500);

    // min is higher number so the error should show up
    await expect(canvas.getByText('Invalid number range.')).toBeInTheDocument();

    await delay(500);

    // increase max number
    await userEvent.type(canvas.getByTestId('numberRangeInput-max-flat'), '0');

    await delay(500);

    // now there shouldn't be any errors
    await expect(canvas.queryByText('Invalid number range.')).not.toBeTruthy();
};
