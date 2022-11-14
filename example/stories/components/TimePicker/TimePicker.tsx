import { useMolecules, TimePickerProps } from 'bamboo-molecules';

export type Props = TimePickerProps & {};

export const Example = (props: Props) => {
    const { TimePicker } = useMolecules();

    return <TimePicker {...props} onChange={undefined as any} />;
};
