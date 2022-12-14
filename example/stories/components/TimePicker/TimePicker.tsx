import { useMolecules, TimePickerProps } from 'bamboo-molecules';
import { useCallback, useState } from 'react';

export type Props = TimePickerProps & {};

export const Example = (props: Props) => {
    const { TimePicker } = useMolecules();

    return <TimePicker {...props} onTimeChange={undefined as any} />;
};

export const ControlledExample = (props: Props) => {
    const { TimePicker } = useMolecules();
    const [time, setTime] = useState('10:15');

    const onTimeChange = useCallback(({ time: newTime }: { time: string }) => {
        setTime(newTime);
    }, []);

    return <TimePicker {...props} time={time} onTimeChange={onTimeChange} />;
};
