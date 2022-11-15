import { useMolecules, SectionGridProps } from 'bamboo-molecules';

export type Props<T> = SectionGridProps<T> & {};

export const Example = <T,>(props: Props<T>) => {
    const { SectionGrid } = useMolecules();

    return <SectionGrid {...props} />;
};
