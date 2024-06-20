import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ControlledExample } from './TimePicker';

export default {
    title: 'components/TimePicker',
    component: ControlledExample,
} as ComponentMeta<typeof ControlledExample>;

export const Default: ComponentStory<typeof ControlledExample> = args => (
    <ControlledExample {...args} />
);

Default.args = {
    inputType: 'picker',
};

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
