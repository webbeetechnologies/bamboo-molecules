import { useMolecules, TimePickerFieldProps } from 'bamboo-molecules';
import { useCallback, useState } from 'react';

export type Props = TimePickerFieldProps & {};

export const Example = (props: Props) => {
    const { TimePickerField } = useMolecules();
    const [time, setTime] = useState<Date | null>(new Date('2023-01-01T00:00:00.000Z'));

    const onChange = useCallback(
        (newDate: Date) => {
            props.onTimeChange?.(newDate);
            setTime(newDate);
        },
        [props],
    );

    return <TimePickerField {...props} time={time} onTimeChange={onChange} />;
};
