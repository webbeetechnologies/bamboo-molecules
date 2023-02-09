import { SectionGrid, SectionGridProps } from '../../../src/components';

export type Props<T> = SectionGridProps<T> & {};

export const Example = <T,>(props: Props<T>) => {
    return <SectionGrid {...props} />;
};
