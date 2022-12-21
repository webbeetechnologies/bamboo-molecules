import { useMolecules, DatePickerInputProps } from 'bamboo-molecules';
import { useCallback, useState } from 'react';

export type Props = DatePickerInputProps & {};

export const Example = (props: Props) => {
    const { DatePickerInput } = useMolecules();

    return <DatePickerInput {...props} onChange={undefined as any} />;
};

export const ControlledExample = (props: Props) => {
    const { DatePickerInput } = useMolecules();
    const [date, setDate] = useState<Date | null>(new Date(2022, 11, 5));
    const onChange = useCallback((d: Date | null) => setDate(d), []);

    return <DatePickerInput {...props} value={date} onChange={onChange} />;
};
