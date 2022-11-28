import { useMolecules, NumberRangeInputProps } from 'bamboo-molecules';

export type Props = NumberRangeInputProps & {};

export const Example = (props: Props) => {
    const { NumberRangeInput } = useMolecules();

    return <NumberRangeInput {...props} />;
};
