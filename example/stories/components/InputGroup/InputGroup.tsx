import { useMolecules, InputGroupProps } from 'bamboo-molecules';

export type Props = InputGroupProps & {};

export const Example = (props: Props) => {
    const { InputGroup } = useMolecules();

    return <InputGroup {...props} />;
};
