import { useMolecules, TimePickerFieldProps } from 'bamboo-molecules';
import { useCallback, useState } from 'react';

export type Props = TimePickerFieldProps & {};

export const Example = (props: Props) => {
    const { TimePickerField } = useMolecules();
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
