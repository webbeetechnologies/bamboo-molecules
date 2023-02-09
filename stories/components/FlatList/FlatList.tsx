import { FlatList, FlatListProps } from '../../../src/components';

export type Props<T> = FlatListProps<T> & {};

export const Example = <T,>(props: Props<T>) => {
    return <FlatList {...props} />;
};
