import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ControlledExample } from './DatePickerInput';

export default {
    title: 'components/DatePickerInput',
    component: ControlledExample,
} as ComponentMeta<typeof ControlledExample>;

export const Default: ComponentStory<typeof ControlledExample> = args => (
    <ControlledExample {...args} />
);

Default.args = {
    locale: 'en',
    inputMode: 'start',
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
