import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { expect } from '@storybook/jest';
import { userEvent, waitFor, within } from '@storybook/testing-library';

import { Example } from './TimePickerField';

export default {
    title: 'components/TimePickerField',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    testID: 'timepickerfield',
    is24Hour: false,
};

Default.parameters = {
    docs: {
        source: {
            code: `
    const { TimePickerField } = useMolecules();
    const [time, setTime] = useState<Date | null>(null);

    const onChange = useCallback(
        (newDate: Date) => {
            setTime(newDate);
        },
        [props],
    );

    return <TimePickerField time={time} onTimeChange={onChange} />;
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

Default.play = async ({ canvasElement }) => {
    const canvas = await within(canvasElement);

    await waitFor(() => canvas);

    const timeInput = await canvas.getByTestId('timepickerfield-flat');

    await userEvent.clear(timeInput);
    await userEvent.type(timeInput, '1');
    await userEvent.click(canvasElement);

    await waitFor(() => expect(canvas.getByDisplayValue('01:00am')).toBeInTheDocument());

    await userEvent.clear(timeInput);
    await userEvent.type(timeInput, '00:30');
    await userEvent.click(canvasElement);

    await waitFor(() => expect(canvas.getByDisplayValue('12:30am')).toBeInTheDocument());

    await userEvent.clear(timeInput);
    await userEvent.type(timeInput, '1230pm');
    await userEvent.click(canvasElement);

    await waitFor(() => expect(canvas.getByDisplayValue('12:30pm')).toBeInTheDocument());

    await userEvent.clear(timeInput);
    // for hour the first digit cannot be greater than 1 and the second digit cannot be greater than 2
    await userEvent.type(timeInput, '3213130');
    await userEvent.click(canvasElement);

    await waitFor(() => expect(canvas.getByDisplayValue('11:30am')).toBeInTheDocument());
};

export const TwentyFourHourTest = Default.bind({});

TwentyFourHourTest.args = {
    testID: 'timepickerfield',
    is24Hour: true,
};

TwentyFourHourTest.play = async ({ canvasElement }) => {
    const canvas = await within(canvasElement);

    await waitFor(() => canvas);

    const timeInput = await canvas.getByTestId('timepickerfield-flat');

    await userEvent.clear(timeInput);
    await userEvent.type(timeInput, '1');
    await userEvent.click(canvasElement);

    await waitFor(() => expect(canvas.getByDisplayValue('01:00')).toBeInTheDocument());

    await userEvent.clear(timeInput);
    await userEvent.type(timeInput, '00:30');
    await userEvent.click(canvasElement);

    await waitFor(() => expect(canvas.getByDisplayValue('00:30')).toBeInTheDocument());

    await userEvent.clear(timeInput);
    await userEvent.type(timeInput, '1230pm');
    await userEvent.click(canvasElement);

    await waitFor(() => expect(canvas.getByDisplayValue('12:30')).toBeInTheDocument());

    await userEvent.clear(timeInput);
    // for hour the first digit cannot be greater than 2 and the second digit cannot be greater than 3
    await userEvent.type(timeInput, '3213130');
    await userEvent.click(canvasElement);

    await waitFor(() => expect(canvas.getByDisplayValue('21:31')).toBeInTheDocument());
};
