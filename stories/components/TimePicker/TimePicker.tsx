import { useCallback, useState } from 'react';
import { TimePicker, TimePickerProps } from '../../../src/components';

export type Props = TimePickerProps & {};

export const Example = (props: Props) => {
    return <TimePicker {...props} onTimeChange={undefined as any} />;
};

export const ControlledExample = (props: Props) => {
    const [time, setTime] = useState('10:15');

    const onTimeChange = useCallback(({ time: newTime }: { time: string }) => {
        setTime(newTime);
    }, []);

    return <TimePicker {...props} time={time} onTimeChange={onTimeChange} />;
};
