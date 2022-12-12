import { useMolecules, OptionListProps } from 'bamboo-molecules';

export type Props<TItem> = OptionListProps<TItem> & {};

export const Example = <TItem,>(props: Props<TItem>) => {
    const { OptionList } = useMolecules();

    return <OptionList {...props} />;
};
