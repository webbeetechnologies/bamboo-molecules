import { useRef } from 'react';
import { useMolecules, DropdownListProps, useToggle } from 'bamboo-molecules';

// @ts-ignore
export type Props = DropdownListProps & {};

export const Example = (props: Props) => {
    const { DropdownList } = useMolecules();

    return <DropdownList {...props} />;
};

export const ExampleWithToggle = (props: Props) => {
    const { DropdownList, Button } = useMolecules();
    const triggerRef = useRef(null);
    const { state: isOpen, onToggle, setState: setIsOpen } = useToggle();

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
