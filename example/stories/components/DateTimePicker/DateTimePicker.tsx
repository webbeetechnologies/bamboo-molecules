import { useMolecules, DateTimePickerProps } from 'bamboo-molecules';
import { useCallback, useState } from 'react';

export type Props = DateTimePickerProps & {};

export const Example = (props: Props) => {
    const { DateTimePicker } = useMolecules();
    const [date, setDate] = useState<Date | null>(null);

    const onChange = useCallback(
        (newDate: Date | null) => {
            props.onChange?.(newDate);
            setDate(newDate);
        },
        [props],
    );

    return <DateTimePicker {...props} date={date} onChange={onChange} />;
};
