import { useMolecules, OptionListProps } from 'bamboo-molecules';

export type Props = OptionListProps & {};

export const Example = (props: Props) => {
    const { OptionList } = useMolecules();

    return <OptionList {...props} />;
};
