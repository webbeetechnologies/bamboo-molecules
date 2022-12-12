import { useCallback, useRef, useState } from 'react';
import { useMolecules, SelectProps } from 'bamboo-molecules';

// @ts-ignore
export type Props<T> = SelectProps<T> & {};

export const Example = <T,>(props: Props<T>) => {
    const { Select } = useMolecules();

    return <Select {...props} />;
};

export const ExampleWithToggle = <T,>(props: Props<T>) => {
    const { DropdownList, Button } = useMolecules();
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef(null);

    const onToggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);

    return (
        <>
            <Button ref={triggerRef} onPress={onToggle}>
                Toggle DropdownList
            </Button>
            <DropdownList
                {...props}
                triggerRef={triggerRef}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </>
    );
};
