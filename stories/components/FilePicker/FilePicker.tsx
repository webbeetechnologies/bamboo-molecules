import { FilePicker, FilePickerProps } from '../../../src/components';

export type Props = FilePickerProps & {};

export const Example = (props: Props) => {
    return <FilePicker {...props} />;
};
