import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './DateTimePicker';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export default {
    title: 'components/DateTimePicker',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    testID: 'datetimepicker',
};

Default.parameters = {
    docs: {
        source: {
            code: `
    const { DateTimePicker } = useMolecules();
    const [date, setDate] = useState<Date | null>(null);

    return <DateTimePicker date={date} onChange={setDate} />;
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

Default.play = async ({ canvasElement }) => {
    const canvas = await within(canvasElement);

    await waitFor(() => canvas);

    const dateInput = await canvas.getByTestId('datetimepicker--datepickerinput-outlined');
    const timeInput = await canvas.getByTestId('datetimepicker--timepickerinput-outlined');
    // const timepickerModal = await canvas.getByTestId('datetimepicker--timepickermodal');

    await userEvent.type(dateInput, '13/01/2022');

    expect(canvas.getByDisplayValue('13/01/2022')).toBeInTheDocument();

    await userEvent.type(timeInput, '1');
    await userEvent.click(canvasElement);

    expect(canvas.getByDisplayValue('01:00am')).toBeInTheDocument();
};
