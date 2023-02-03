import { SectionList, SectionListProps } from '../../../src/components';

export type Props<T> = SectionListProps<T> & {};

export const Example = <T,>(props: Props<T>) => {
    return <SectionList {...props} />;
};
