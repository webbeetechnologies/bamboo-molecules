import { useCallback, useState } from 'react';
import { DatePickerInline, DatePickerInlineProps } from '../../../src/components';

export type Props = DatePickerInlineProps & {};

export const Example = (props: Props) => {
    return <DatePickerInline {...props} onChange={undefined as any} />; // onChange as undefined to avoid storybook's mock action function
};

export const ControlledExample = (props: Props) => {
    const [data, setData] = useState({
        date: new Date(2022, 11, 5),
        dates: [new Date(2022, 11, 5)],
        startDate: new Date(2022, 11, 5),
        endDate: undefined,
    });
    const onChange = useCallback((params: any) => setData(params), []);

    return <DatePickerInline {...props} {...data} onChange={onChange} />;
};
