import { FlatGrid, FlatGridProps } from '../../../src/components';

export type Props<T> = FlatGridProps<T> & {};

export const Example = <T,>(props: Props<T>) => {
    return <FlatGrid {...props} />;
};
