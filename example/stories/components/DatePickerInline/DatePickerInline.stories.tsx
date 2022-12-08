import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ControlledExample } from './DatePickerInline';

export default {
    title: 'components/DatePickerInline',
    component: ControlledExample,
} as ComponentMeta<typeof ControlledExample>;

export const Controlled: ComponentStory<typeof ControlledExample> = args => (
    <ControlledExample {...args} />
);

Controlled.args = {
    mode: 'single',
    locale: 'en',
};

Controlled.parameters = {
    controls: {
        exclude: /(?:\b|')(date|dates|startDate|endDate|onChange)(?:\b|')/,
    },
    docs: {
        source: {
            code: `
    const { DatePickerInline } = useMolecules();
    const [data, setData] = useState({
        date: new Date(2022, 11, 5),
        dates: [new Date(2022, 11, 5)],
        startDate: new Date(2022, 11, 5),
        endDate: undefined,
    });
    const onChange = useCallback((params: any) => setData(params), []);

    return <DatePickerInline mode="single" locale="en" {...data} onChange={onChange} />;
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
