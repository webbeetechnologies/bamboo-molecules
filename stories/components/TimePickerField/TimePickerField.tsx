import { useCallback, useState } from 'react';
import { TimePickerField, TimePickerFieldProps } from '../../../src/components';

export type Props = TimePickerFieldProps & {};

export const Example = (props: Props) => {
    const [time, setTime] = useState<string>('10:13');

    const onChange = useCallback(
        (newTime: string) => {
            props.onTimeChange?.(newTime);
            setTime(newTime);
        },
        [props],
    );

    return <TimePickerField {...props} time={time} onTimeChange={onChange} />;
};
