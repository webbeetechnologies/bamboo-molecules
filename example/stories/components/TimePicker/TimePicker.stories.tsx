import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { delay } from '../../common';
import { ControlledExample } from './TimePicker';

export default {
    title: 'components/TimePicker',
    component: ControlledExample,
} as ComponentMeta<typeof ControlledExample>;

export const Default: ComponentStory<typeof ControlledExample> = args => (
    <ControlledExample {...args} />
);

Default.args = {};

Default.parameters = {
    docs: {
        source: {
            code: `
    const { TimePicker } = useMolecules();
    const [time, setTime] = useState('10:15');

    const onTimeChange = useCallback(({ time: newTime }: { time: string }) => {
        setTime(newTime);
    }, []);

    return <TimePicker {...props} time={time} onTimeChange={onTimeChange} />;
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const Interactions = Default.bind({});

Interactions.args = {
    ...Default.args,
    testID: 'timePickerInteractions',
};

Interactions.parameters = {
    ...Default.parameters,
};

Interactions.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await delay(500);

    // clear the hour input
    await userEvent.clear(canvas.getByTestId('timePickerInteractions-hour-input-plain'));

    await delay(500);

    // enter 15 in hour input
    await userEvent.type(canvas.getByTestId('timePickerInteractions-hour-input-plain'), '15');

    await delay(500);

    // focus out
    await userEvent.click(canvasElement);

    // since it's not 24Hour mode, 15 should be 03
    await expect(canvas.getByDisplayValue('03')).toBeInTheDocument();

    await delay(500);

    // clear the minute input
    await userEvent.clear(canvas.getByTestId('timePickerInteractions-minute-input-plain'));

    await delay(500);

    // type in 60
    await userEvent.type(canvas.getByTestId('timePickerInteractions-minute-input-plain'), '60');

    await delay(500);

    // if the minute reach 60, it should increment the hour value
    await expect(canvas.getByDisplayValue('04')).toBeInTheDocument();

    await delay(500);

    await userEvent.click(canvasElement);

    // And the minute value should be 00
    await expect(canvas.getByDisplayValue('00')).toBeInTheDocument();
};
