import { useCallback, useRef, useState } from 'react';
import { DatePickerDocked, DatePickerDockedProps } from '../../../src/components';
import { useMolecules, useToggle } from '../../common';

export type Props = DatePickerDockedProps & {};

export const Example = (props: Props) => {
    return <DatePickerDocked {...props} onChange={undefined as any} />; // onChange as undefined to avoid storybook's mock action function
};

export const ControlledExample = (props: Props) => {
    const triggerRef = useRef(null);
    const { Button } = useMolecules();
    const { state: isOpen, onToggle } = useToggle(false);

    const [data, setData] = useState({
        date: new Date(2022, 11, 5),
        dates: [new Date(2022, 11, 5)],
        startDate: new Date(2022, 11, 5),
        endDate: undefined,
    });
    const onChange = useCallback((params: any) => setData(params), []);

    return (
        <>
            <Button variant="text" ref={triggerRef} onPress={onToggle} testID={'trigger'}>
                Select Date
            </Button>
            <DatePickerDocked
                {...props}
                {...data}
                onChange={onChange}
                isOpen={isOpen}
                triggerRef={triggerRef}
                onToggle={onToggle}
            />
        </>
    );
};
