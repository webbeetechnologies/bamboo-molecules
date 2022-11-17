import { useMolecules, FlatGridProps } from 'bamboo-molecules';

export type Props<T> = FlatGridProps<T> & {};

export const Example = <T,>(props: Props<T>) => {
    const { FlatGrid } = useMolecules();

    return <FlatGrid {...props} />;
};
