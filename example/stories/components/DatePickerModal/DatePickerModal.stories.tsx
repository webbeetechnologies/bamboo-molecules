import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ControlledExample } from './DatePickerModal';

export default {
    title: 'components/DatePickerModal',
    component: ControlledExample,
} as ComponentMeta<typeof ControlledExample>;

export const Controlled: ComponentStory<typeof ControlledExample> = args => (
    <ControlledExample {...args} />
);

Controlled.args = {
    locale: 'en',
    isOpen: true,
};

Controlled.parameters = {
    controls: {
        exclude: /(?:\b|')(date|dates|startDate|endDate|onChange)(?:\b|')/,
    },
    docs: {
        source: {
            code: `
    const { DatePickerModal } = useMolecules();
    const [data, setData] = useState({
        date: new Date(2022, 11, 5),
        dates: [new Date(2022, 11, 5)],
        startDate: new Date(2022, 11, 5),
        endDate: undefined,
    });
    const onChange = useCallback((params: any) => setData(params), []);

    return <DatePickerModal {...data} onChange={onChange} />;
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
