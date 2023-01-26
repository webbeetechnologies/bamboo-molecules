import { useMolecules, DateTimePickerProps } from 'bamboo-molecules';
import { useState } from 'react';

export type Props = DateTimePickerProps & {};

export const Example = (props: Props) => {
    const { DateTimePicker } = useMolecules();
    const [date, setDate] = useState<Date | null>(null);

    return <DateTimePicker {...props} date={date} onChange={setDate} />;
};
