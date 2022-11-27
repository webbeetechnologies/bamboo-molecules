import { useMolecules, DropdownListProps, useToggle } from 'bamboo-molecules';
import { useMemo } from 'react';

// @ts-ignore
export type Props<T> = DropdownListProps<T> & {};

export const Example = <T,>(props: Props<T>) => {
    const { DropdownList } = useMolecules();

    return <DropdownList {...props} />;
};

export const ExampleWithToggle = <T,>(props: Props<T>) => {
    const { DropdownList, Button } = useMolecules();
    const [isOpen, onToggle] = useToggle();

    const TriggerComponent = useMemo(
        () => (props: any) => <Button {...props}>Toggle DropdownList</Button>,
        [Button],
    );

    return (
        <DropdownList
            {...props}
            isOpen={isOpen}
            setIsOpen={onToggle}
            TriggerComponent={TriggerComponent}
        />
    );
};
