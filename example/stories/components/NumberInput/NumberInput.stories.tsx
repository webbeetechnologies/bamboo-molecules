import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { delay } from '../../common';
import { Example } from './NumberInput';

export default {
    title: 'components/NumberInput',
    component: Example,

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
    const { NumberInput } = useMolecules();

    const [number, setNumber] = useState('');

    const onChangeNumber = useCallback((text: string) => {
        setNumber(text);
    }, []);

    return <NumberInput value={number} onChangeText={onChangeNumber} />;`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const Interactions = Default.bind({});

Interactions.args = {
    ...Default.args,
    testID: 'numberInputInteractions',
};

Interactions.parameters = {
    ...Default.parameters,
};

Interactions.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await delay(500);

    await userEvent.type(canvas.getByTestId('numberInputInteractions-flat'), 'hello123.56.');

    await delay(500);

    await expect(canvas.getByDisplayValue('123.56')).toBeInTheDocument();
};
