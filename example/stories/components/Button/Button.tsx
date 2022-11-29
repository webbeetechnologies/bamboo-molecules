import { useMolecules, ButtonProps } from 'bamboo-molecules';

export type Props = ButtonProps;

export const Example = (props: ButtonProps) => {
    const { Button } = useMolecules();

    return <Button {...props} />;
};
