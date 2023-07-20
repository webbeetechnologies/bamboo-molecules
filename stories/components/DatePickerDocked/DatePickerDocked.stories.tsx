import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ControlledExample } from './DatePickerDocked';

export default {
    title: 'components/DatePickerDocked',
    component: ControlledExample,
    parameters: {
        date: new Date('2022-12-10T10:04:22.146'),
    },
} as ComponentMeta<typeof ControlledExample>;

export const Controlled: ComponentStory<typeof ControlledExample> = args => (
    <ControlledExample {...args} />
);

Controlled.args = {
    locale: 'en',
    pickerMode: 'popover',
    label: 'date',
};

Controlled.parameters = {
    controls: {
        exclude: /(?:\b|')(date|dates|startDate|endDate|onChange)(?:\b|')/,
    },
    docs: {
        source: {
            code: `
    const { DatePickerDocked } = useMolecules();
    const [data, setData] = useState({
        date: new Date(2022, 11, 5),
        dates: [new Date(2022, 11, 5)],
        startDate: new Date(2022, 11, 5),
        endDate: undefined,
    });
    const onChange = useCallback((params: any) => setData(params), []);

    return <DatePickerDocked mode="single" locale="en" {...data} onChange={onChange} />;
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
