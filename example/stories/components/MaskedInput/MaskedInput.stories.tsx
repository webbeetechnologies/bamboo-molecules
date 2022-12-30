import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { createNumberMask, Masks } from 'bamboo-molecules';

import { Example, ControlledExample } from './MaskedInput';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
    title: 'components/MaskedInput',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    mask: createNumberMask({
        delimiter: '',
        precision: 0,
        separator: '',
    }),
    placeholder: 'enter numbers',
    label: 'number',
    variant: 'flat',
    testID: 'numberInput',
};

Default.parameters = {
    docs: {
        source: {
            code: `
    const { MaskedInput } = useMolecules();

    const mask = useMemo(() => {
        return createNumberMask({
            delimiter: '',
            precision: 0,
            separator: '',
        })
    }, [])

    return <MaskedInput mask={mask} placeholder="enter numbers" label="number" />;`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

const maskInteractionTest = async (
    canvasElement: HTMLElement,
    args: typeof Default.args,
    enteredValue: string,
    expectedValue: string,
) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId(
        `${args.testID}-${args.variant || 'flat'}`,
    ) as HTMLInputElement;

    await userEvent.type(input, enteredValue);

    await expect(input.value).toBe(expectedValue);

    await userEvent.clear(input);
    await userEvent.click(canvasElement);
};

Default.play = async ({ canvasElement, args }) =>
    await maskInteractionTest(canvasElement, args, 'lajf29lja9fla222', '299222');

export const Controlled: ComponentStory<typeof ControlledExample> = args => (
    <ControlledExample {...args} />
);

Controlled.args = {
    mask: Masks.CREDIT_CARD,
    placeholder: '---- ---- ---- ----',
    label: 'Credit Card',
    testID: 'creditCardInput',
    variant: 'flat',
};

Controlled.parameters = {
    docs: {
        source: {
            code: `
    const { MaskedInput } = useMolecules();
    const [text, setText] = useState('');

    const onChangeText = useCallback((maskedText: string) => {
        setText(maskedText);
    }, []);

    return <MaskedInput mask={Masks.CREDIT_CARD} value={text} onChangeText={onChangeText} label="Credit Card" placeholder="---- ---- ---- ----" />;`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

Controlled.play = async ({ canvasElement, args }) =>
    await maskInteractionTest(canvasElement, args, '122345.5535', '1223 4555 35');
