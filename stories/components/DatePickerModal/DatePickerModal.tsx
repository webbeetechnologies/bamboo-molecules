import { DatePickerModal, DatePickerModalProps } from '../../../src/components';
import { useCallback, useState } from 'react';

export type Props = DatePickerModalProps & {};

export const Example = (props: Props) => {
    return <DatePickerModal {...props} onChange={undefined as any} />;
};

export const ControlledExample = (props: Props) => {
    const [data, setData] = useState({
        date: new Date(2022, 11, 5),
        dates: [new Date(2022, 11, 5)],
        startDate: new Date(2022, 11, 5),
        endDate: undefined,
    });
    const onChange = useCallback((params: any) => setData(params), []);

    return <DatePickerModal {...props} {...data} onChange={onChange} />;
};
