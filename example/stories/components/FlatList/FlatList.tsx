import { useMolecules, FlatListProps } from 'bamboo-molecules';

export type Props<T> = FlatListProps<T> & {};

export const Example = <T,>(props: Props<T>) => {
    const { FlatList } = useMolecules();

    return <FlatList {...props} />;
};
