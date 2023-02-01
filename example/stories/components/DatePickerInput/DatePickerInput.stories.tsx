import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { delay } from '../../common';
import { ControlledExample } from './DatePickerInput';

export default {
    title: 'components/DatePickerInput',
    component: ControlledExample,
    parameters: {
        date: new Date('2022-12-10T10:04:22.146'),
    },
} as ComponentMeta<typeof ControlledExample>;

export const Default: ComponentStory<typeof ControlledExample> = args => (
    <ControlledExample {...args} />
);

Default.args = {
    label: 'date',
    dateFormat: 'MM/dd/yy',
};

Default.parameters = {
    controls: {
        exclude: /(?:\b|')(date|onChange)(?:\b|')/,
    },
    docs: {
        source: {
            code: `
    const { DatePickerInput } = useMolecules();
    const [date, setDate] = useState<Date | undefined>(new Date(2022, 11, 5));
    const onChange = useCallback((d: Date | undefined) => setDate(d), []);

    return <DatePickerInput value={date} onChange={onChange} />;
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const Interactions = Default.bind({});

Interactions.args = {
    ...Default.args,
    testID: 'datepickerInputInteractions',
};

Interactions.parameters = {
    ...Default.parameters,
};

Interactions.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await delay(500);

    // first clear the input
    await userEvent.clear(canvas.getByTestId('datepickerInputInteractions-flat'));

    await delay(500);

    // type in the wrong format
    await userEvent.type(canvas.getByTestId('datepickerInputInteractions-flat'), '1311');

    await delay(500);

    await userEvent.type(canvas.getByTestId('datepickerInputInteractions-flat'), '111');

    await delay(500);

    // should show an error
    await expect(canvas.getByText('Date format must be MM/dd/yy')).toBeInTheDocument();

    await delay(500);

    // clear again
    await userEvent.clear(canvas.getByTestId('datepickerInputInteractions-flat'));

    await delay(500);

    // type in the correct format
    await userEvent.type(canvas.getByTestId('datepickerInputInteractions-flat'), '121122');

    await delay(500);

    // the error should be gone
    await expect(canvas.queryByText('Date format must be MM/dd/yy')).not.toBeTruthy();

    await delay(500);

    // click the calendar icon
    await userEvent.click(canvas.getByRole('button'));

    await delay(500);

    // the modal should show up
    await expect(
        within(canvasElement.ownerDocument.body).getByText('SELECT DATE'),
    ).toBeInTheDocument();
};
