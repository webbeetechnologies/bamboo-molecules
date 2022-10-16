import { useMolecules, ButtonProps } from 'bamboo-molecules';

export type Props = ButtonProps & {};

export const Example = (props: Props) => {
    const { Button } = useMolecules();

    return <Button {...props} />;
};
