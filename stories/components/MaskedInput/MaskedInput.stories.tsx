import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { createNumberMask, Masks } from '../../../src';

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
        suffix: ['%'],
    }),
    placeholder: 'enter numbers',
    label: 'number',
    variant: 'flat',
    testID: 'numberInput',
};

WithNumberMask.parameters = {
    controls: {
        exclude: ['mask'],
    },
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

export const WithCurrencyMask: ComponentStory<typeof ControlledExample> = args => (
    <ControlledExample {...args} />
);

WithCurrencyMask.args = {
    mask: Masks.BRL_CURRENCY,
    placeholder: 'R$ ---.---.---',
    label: 'Currency',
    testID: 'currencyInput',
    variant: 'flat',
};

WithCurrencyMask.parameters = {
    controls: {
        exclude: ['mask'],
    },
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
    args: typeof WithNumberMask.args,
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

WithCurrencyMask.play = async ({ canvasElement, args }) =>
    await maskInteractionTest(canvasElement, args, '122345.5535', 'R$ 12.234.555,35');
