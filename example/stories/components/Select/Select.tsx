import { useMolecules, SelectProps, IconButtonProps } from 'bamboo-molecules';

// @ts-ignore
export type Props = SelectProps & {};

export const Example = (props: Props) => {
    const { Select } = useMolecules();

    return <Select {...props} />;
};

export const IconButton = (props: IconButtonProps) => {
    const { IconButton: IconButtonComponent } = useMolecules();

    return <IconButtonComponent {...props} />;
};
