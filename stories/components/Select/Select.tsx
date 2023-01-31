import { useMolecules, SelectProps } from '../../../src';

// @ts-ignore
export type Props = SelectProps & {};

export const Example = (props: Props) => {
    const { Select } = useMolecules();

    return <Select {...props} />;
};
