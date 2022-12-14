import { useCallback, useState } from 'react';
import { useMolecules, DatePickerInlineProps } from 'bamboo-molecules';

export type Props = DatePickerInlineProps & {};

export const Example = (props: Props) => {
    const { DatePickerInline } = useMolecules();

    return <DatePickerInline {...props} onChange={undefined as any} />; // onChange as undefined to avoid storybook's mock action function
};

export const ControlledExample = (props: Props) => {
    const { DatePickerInline } = useMolecules();
    const [data, setData] = useState({
        date: new Date(2022, 11, 5),
        dates: [new Date(2022, 11, 5)],
        startDate: new Date(2022, 11, 5),
        endDate: undefined,
    });
    const onChange = useCallback((params: any) => setData(params), []);

    return <DatePickerInline {...props} {...data} onChange={onChange} />;
};
