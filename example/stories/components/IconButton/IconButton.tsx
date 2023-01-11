import { useMolecules, IconButtonProps } from 'bamboo-molecules';

export type Props = IconButtonProps & {};

export const Example = (props: Props) => {
    const { IconButton } = useMolecules();

    return <IconButton {...props} />;
};
