import { useMolecules, TimePickerModalProps } from 'bamboo-molecules';

export type Props = TimePickerModalProps & {};

export const Example = (props: Props) => {
    const { TimePickerModal } = useMolecules();

    return <TimePickerModal {...props} />;
};
