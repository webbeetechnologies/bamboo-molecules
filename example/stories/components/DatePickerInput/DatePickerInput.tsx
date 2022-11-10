import { useMolecules, DatePickerInputProps } from 'bamboo-molecules';

export type Props = DatePickerInputProps & {};

export const Example = (props: Props) => {
    const { DatePickerInput } = useMolecules();

    return <DatePickerInput {...props} onChange={undefined as any} />;
};
