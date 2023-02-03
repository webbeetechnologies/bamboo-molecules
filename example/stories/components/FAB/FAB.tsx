import { FABProps, useMolecules } from 'bamboo-molecules';

export type Props = FABProps & {};

export const Example = (props: Props) => {
    const { FAB } = useMolecules();

    return <FAB {...props} />;
};
