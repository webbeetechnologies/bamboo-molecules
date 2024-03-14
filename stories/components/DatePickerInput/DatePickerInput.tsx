import { DatePickerInput, DatePickerInputProps } from '../../../src/components';
import { useCallback, useState } from 'react';

export type Props = DatePickerInputProps & {};

export const Example = (props: Props) => {
    return <DatePickerInput {...props} onChange={undefined as any} />;
};

export const ControlledExample = (props: Props) => {
    const [date, setDate] = useState<Date | null>(new Date(2022, 11, 5));
    const onChange = useCallback((d: Date | null) => setDate(d), []);

    return <DatePickerInput {...props} value={date} onChange={onChange} />;
};
