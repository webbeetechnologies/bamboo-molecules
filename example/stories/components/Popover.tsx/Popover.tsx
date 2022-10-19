import { useMolecules, PopoverProps } from 'bamboo-molecules';


export const Example = (props: PopoverProps) => {
    const { Popover } = useMolecules();

    return <Popover {...props} />;
};
