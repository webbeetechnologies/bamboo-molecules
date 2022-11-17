import { useMolecules, SectionListProps } from 'bamboo-molecules';

export type Props<T> = SectionListProps<T> & {};

export const Example = <T,>(props: Props<T>) => {
    const { SectionList } = useMolecules();

    return <SectionList {...props} />;
};
