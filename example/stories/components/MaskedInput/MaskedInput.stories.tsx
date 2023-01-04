import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { createNumberMask, Masks } from 'bamboo-molecules';

import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Example, ControlledExample } from './MaskedInput';

export default {
    title: 'components/MaskedInput',
    component: Example,
} as ComponentMeta<typeof Example>;

export const WithNumberMask: ComponentStory<typeof Example> = args => (
    <ControlledExample {...args} />
);

WithNumberMask.args = {
    mask: createNumberMask({
        delimiter: ',',
        precision: 0,
        separator: '.',
    }),
    placeholder: 'enter numbers',
    label: 'number',
    variant: 'flat',
    testID: 'numberInput',
};

WithNumberMask.parameters = {
    docs: {
        source: {
            code: `
    const { MaskedInput } = useMolecules();
    const [text, setText] = useState('');

    const onChangeText = useCallback((maskedText: string) => {
        setText(maskedText);
    }, []);

    const mask = useMemo(() => {
        return createNumberMask({
            delimiter: ',',
            precision: 3,
            separator: '.',
        })
    }, [])

    return <MaskedInput mask={mask} placeholder="enter numbers" label="number" value={text} onChangeText={onChangeText} />;`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

WithNumberMask.play = async ({ canvasElement, args }) =>
    await maskInteractionTest(canvasElement, args, 'lajf29lja9fla222', '299,222');

export const WithCreditCardMask: ComponentStory<typeof ControlledExample> = args => (
    <ControlledExample {...args} />
);

WithCreditCardMask.args = {
    mask: Masks.CREDIT_CARD,
    placeholder: '---- ---- ---- ----',
    label: 'Credit Card',
    testID: 'creditCardInput',
    variant: 'flat',
};

WithCreditCardMask.parameters = {
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

const maskInteractionTest = async (
    canvasElement: HTMLElement,
    args: typeof WithCreditCardMask.args,
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

WithCreditCardMask.play = async ({ canvasElement, args }) =>
    await maskInteractionTest(canvasElement, args, '122345.5535', '1223 4555 35');
