import { useMolecules, DatePickerModalProps } from 'bamboo-molecules';

export type Props = DatePickerModalProps & {};

export const Example = (props: Props) => {
    const { DatePickerModal } = useMolecules();

    return <DatePickerModal {...props} onChange={undefined as any} />;
};
