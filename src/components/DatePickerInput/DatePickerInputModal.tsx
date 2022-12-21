import { memo, useCallback, useState } from 'react';
import type { DatePickerModalProps } from '../DatePickerModal';
import { useMolecules } from '../../hooks';

const DatePickerInputModal = ({
    date,
    onConfirm: onConfirmProp,
    onClose: onCloseProp,
    ...rest
}: DatePickerModalProps) => {
    const { DatePickerModal } = useMolecules();

    // want to control this by the input and only pass the value when onConfirm is clicked
    const [value, onValueChange] = useState(date);

    const onChange = useCallback(
        (val: any) => {
            onValueChange(val?.date);
        },
        [onValueChange],
    );

    const onConfirm = useCallback(() => {
        onConfirmProp?.({ date: value } as any);
    }, [onConfirmProp, value]);

    const onClose = useCallback(() => {
        onValueChange(date); // revert back before close it

        onCloseProp?.();
    }, [date, onCloseProp]);

    return (
        <DatePickerModal
            {...rest}
            onClose={onClose}
            onConfirm={onConfirm}
            date={value}
            onChange={onChange}
            mode="single"
        />
    );
};

export default memo(DatePickerInputModal);
