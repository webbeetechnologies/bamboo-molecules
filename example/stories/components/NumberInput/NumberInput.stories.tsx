import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { delay } from '../../common';
import { Example, ControlledExample } from './NumberInput';

export default {
    title: 'components/NumberInput',
    component: Example,

    argTypes: {},
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    variant: 'flat',
    placeholder: 'Placeholder',
    label: 'Enter numbers',
};

Default.parameters = {
    docs: {
        source: {
            code: `
    const { NumberInput } = useMolecules();

    return <NumberInput />;`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const Controlled: ComponentStory<typeof ControlledExample> = args => (
    <ControlledExample {...args} />
);

Controlled.args = {
    variant: 'flat',
    placeholder: 'Placeholder',
    label: 'Enter numbers',
};

Controlled.parameters = {
    controls: {
        exclude: ['value'],
    },
    docs: {
        source: {
            code: `
    const { NumberInput } = useMolecules();

    return <NumberInput />;`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const Interactions = Controlled.bind({});

Interactions.args = {
    ...Controlled.args,
    testID: 'numberInputInteractions',
    defaultValue: '12345',
};

Interactions.parameters = {
    ...Controlled.parameters,
};

Interactions.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
        // value should overwrite the default value
        await expect(canvas.queryByText('12345')).not.toBeTruthy();

        await userEvent.type(
            canvas.getByTestId('numberInputInteractions-flat'),
            'hello!@#$%^&*()123.56.',
        );

        await delay(500);

        await expect(canvas.getByDisplayValue('123.56')).toBeInTheDocument();
    });
};
