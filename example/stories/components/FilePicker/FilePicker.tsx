import { useMolecules, FilePickerProps } from 'bamboo-molecules';

export type Props = FilePickerProps & {};

export const Example = (props: Props) => {
    const { FilePicker } = useMolecules();

    return <FilePicker {...props} />;
};
