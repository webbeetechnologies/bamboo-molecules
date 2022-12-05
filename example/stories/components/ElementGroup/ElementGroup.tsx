import { useMolecules, ElementGroupProps } from 'bamboo-molecules';

export type Props = ElementGroupProps & {};

export const Example = (props: Props) => {
    const { ElementGroup } = useMolecules();

    return <ElementGroup {...props} />;
};
