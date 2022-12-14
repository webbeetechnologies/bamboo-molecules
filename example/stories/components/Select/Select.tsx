import { useMolecules, SelectProps } from 'bamboo-molecules';

// @ts-ignore
export type Props<T> = SelectProps<T> & {};

export const Example = <T,>(props: Props<T>) => {
    const { Select } = useMolecules();

    return <Select {...props} />;
};
