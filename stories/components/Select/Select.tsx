import { useMolecules, SelectProps } from '../../../src';

export type Props = SelectProps & {};

export const Example = (props: Props) => {
    const { Select } = useMolecules();

    return <Select {...props} />;
};
