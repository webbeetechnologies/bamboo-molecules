import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example } from './DateTimePicker';

export default {
    title: 'components/DateTimePicker',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {};

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
