import { useMolecules, OptionListProps } from 'bamboo-molecules';

export type Props<TItem, TSection> = OptionListProps<TItem, TSection> & {};

export const Example = <TItem, TSection>(props: Props<TItem, TSection>) => {
    const { OptionList } = useMolecules();

    return <OptionList {...props} />;
};
